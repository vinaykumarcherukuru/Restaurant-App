var jsSHA = require("jssha");

const Payments = require('../models/paymentModel')
const Users = require('../models/userModel')

const PaymentCtrl = {
    getPayments: async (req, res) => {
        try {
            const payments = await Payments.find()
            res.json(payments)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    createPayment: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id).select('firstname lastname email')

            if (!user) return res.status(400).json({ msg: "User does not exists." })

            const { cart, payuMoneyId, address, amount, bankcode, cardnum, PG_TYPE, mode, bank_ref_num, name_on_card, net_amount_debit, txnid, txnStatus } = req.body
            const { _id, firstname, lastname, email } = user

            const newPayment = new Payments({
                // User and Cart Details
                user_id: _id,
                name: firstname + ' ' + lastname,
                email,
                cart,

                // Transaction Details
                paymentId: payuMoneyId,  // The payUmoney transaction id.
                address : 'Hyderabad',
                amount,
                cardType: bankcode, // The payumoney code number of issuing bank involved in the transaction.	VISA, MASTER
                cardnum,
                PG_TYPE,  // The payment gateway used to process the payment. HDFCPG
                PaymentMode: mode,  // Payment Mode in: Netbanking (NB), Debit Card(DC), Credit Card(CC), Wallet, etc..
                bank_ref_num,
                name_on_card,
                net_amount_debit,
                txnid, // Transaction Id passed by the merchant
                status: txnStatus //Transaction Status from Bolt
            })
           // console.log(newPayment)
            await newPayment.save()
            res.json({ msg: newPayment })
        } catch (err) {
            // console.log(err)
            return res.status(500).json({ msg: err.message })
        }
    },

    payUmoney: {
        sendPayment: async (req, res) => {
            try {
                if (!req.body.txnid || !req.body.amount || !req.body.productinfo || !req.body.firstname || !req.body.email) {
                    res.send("Mandatory fields missing");
                }
                else {
                    var payUmoneyParams = {
                        key: 'koLYkRbp',  // Merchant key from PayuMoney Dashboard
                        txnid: req.body.txnid, // Unique Transaction ID
                        hash: '',
                        amount: req.body.amount, // Amount to be paid
                        firstname: req.body.firstname, // Name of the User
                        email: req.body.email, // Email Id of User
                        phone: req.body.phone, // Mobile number of User 
                        productinfo: req.body.productinfo, // Product name,
                        surl: '', //Success callback URL,
                        furl: '' //, // Failure callback URL ,
                        //mode:'dropout'// non-mandatory for Customized Response Handling                  
                    }

                    var hashString = 'koLYkRbp' // config.payumoney.key // Merchant Key 
                        + '|' + payUmoneyParams.txnid
                        + '|' + payUmoneyParams.amount + '|' + payUmoneyParams.productinfo + '|'
                        + payUmoneyParams.firstname + '|' + payUmoneyParams.email + '|'
                        + '||||||||||'
                        + 'Mlkjn9hWHZ' //config.payumoney.salt // Your salt value         

                    var sha = new jsSHA('SHA-512', "TEXT");
                    sha.update(hashString)
                    var hashString = sha.getHash("HEX");
                    payUmoneyParams.hash = hashString
                    res.send({ msg: payUmoneyParams });
                    //res.send({ ...RequestData, 'hash': hash });
                }
            }
            catch (err) {
                return res.status(500).json({ msg: err.message })
            }
        },
        PaymentStatus: async (req, res) => {
            var payment = req.body;

            //Generate new Hash
            var hashString = 'Mlkjn9hWHZ' //config.payumoney.salt
                + '|' + payment.status
                + '||||||||||'
                + '|' + payment.email
                + '|' + payment.firstname
                + '|' + payment.productinfo
                + '|' + payment.amount
                + '|' + payment.txnid
                + '|'
                + 'koLYkRbp' //config.payumoney.key

            var sha = new jsSHA('SHA-512', "TEXT");
            sha.update(hashString)
            var hash = sha.getHash("HEX");

            // Verify the new hash with the hash value in response
            if (hash == payment.hash) {
                res.send({ 'status': payment.status });
            }
            else {
                res.send({ 'status': "Error occured" });
            }
        }
    }
}

module.exports = PaymentCtrl