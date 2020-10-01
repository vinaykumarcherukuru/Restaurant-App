/*

TRANSACTION RESPONSE PARAMETERS

S.NO.	PARAMETER NAME	DESCRIPTION	SAMPLE VALUE
1.	txnStatus	Transaction Status from Bolt	SUCCESS
2.	txnMessage	Transaction on related message	Overlay closed by consumer
3.	status	PayUmoney Transaction Status.	success
4.	firstname	Firstname of the payer	Tom
5.	amount	Transaction Amount	1.0
6.	txnid	Transaction Id passed by the merchant	0nf725
7.	hash	Security hash generated in response to protect against data tampering.Merchant is required to generate a response hash and verify it against this hash.	127e2c44016aa4c3dd5bacc09b0239b09c6174f275c 0ec4c8ec7da3db915a754407849cf2537f8655255ac 54ee652c4ef972c721462ec9d0a67c08b66bdbb6ba;
8.	productinfo		Book1
9.	phone	Mobile No of the payer	7406740707
10.	email	Email Id of the payer	abc@payu.in
11.	payuMoneyId	The payUmoney transaction id.	58876806
12.	mode	Payment Mode in:
Netbanking (NB)
Debit Card(DC)
Credit Card(CC)
etc.

NB
13.	addedon	The Timestamp when a transaction is done.	2017-04-26 15:22:05
14.	createdOn	Epoch time(Unix time) when transaction is done.	1493200111000
15.	field9	string	–
16.	PG_TYPE	The payment gateway used to process the payment.	HDFCPG
17.	bank_ref_num	string	1182885976
18.	bankcode	The payumoney code number of issuing bank involved in the transaction.	MAST
19.	error	The error code associated with the transaction.	E000
20.	error_Message	The error code associated with the transaction.	No Error
21.	postUrl	The actual URL where response is posted in SURL/FURL	https://test.payumoney.com/customer/dashboard/#/payment/notification/ success
22.	calledStatus		false
23.	additional_param		–
24.	amount_split	The transaction amount split between wallet & other payment mode in a payumoney transaction.	{“PAYU”:”106.1″}
25.	paisa_mecode	string ; Internal Codes	–
26.	meCode	String ; Internal Codes	–
27.	key	The merchant key available from Payumoney dashboard	40747T
28.	unmappedstatus	PayU parameter for internal use.	captured
29.	postBackParamId	Internal processing identifier.	39803778
30.	mihpayid	Internal processing identifier.	70000000688113
31.	paymentId	The PayU generated Payment Id	58876806


*/