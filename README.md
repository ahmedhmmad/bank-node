# bank-node
Make a REST api using node js and express for a banking application that meets the following requirements:
1. There should be 3 types of accounts: normal customer account, clerk account, and admin account
2. Clerks can be registered and deregistered only by admins. Customers can be added and removed only by clerks and admins.
3. Customers should be able to deposit or withdraw as much money as they want, provided that their balance is always positive.
4. Customers should be able to transfer their money from one account to another, but the bank will take 1% of the transferred amount as fees, although there should be a limit for these fees.
Technical notes:
- You must implement the authentication by yourself. Don't use any third party services for that.
- You may use any database of your liking. Only constraint is that it should be relational.
- You may use any ORM of your liking, or even none at all.
- Using typescript isn't required for that project, but it is always welcome.
- Writing unit tests is required. Use any testing framework of your liking.