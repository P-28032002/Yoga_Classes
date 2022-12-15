# Yoga_Classes

## Problem Statement
Assume that you are the CTO for the outsourcing firm which has been chosen to build an
admission form for the Yoga Classes which happen every month.
Requirements for the admission form are:
- Only people within the age limit of 18-65 can enroll for the monthly classes and they will
be paying the fees on a month on month basis. I.e. an individual will have to pay the fees
every month and he can pay it any time of the month.
- They can enroll any day but they will have to pay for the entire month. The monthly fee is 500/- Rs INR.
- There are a total of 4 batches a day namely 6-7AM, 7-8AM, 8-9AM and 5-6PM. The
participants can choose any batch in a month and can move to any other batch next
month. I.e. participants can shift from one batch to another in different months but in
same month they need to be in same batch.

## Link of Docmentation of Yoga Classes Project
<a href="https://docs.google.com/document/d/1ggl_PMGvxntZlMJNQHU3YtLUlOXOKpdZkwEmueNs0ak/edit?usp=sharing">Assignment Documentation Link - Pratham Madhani</a>

## Assumptions and Understanding of the problem statment
- I have taken two forms instead of taking one form, So the first form (Enroll Form) is for registering the yoga classes participants and for paying monthly fees and the second form is for updating the batch but one time in a month.
- If a person enrolls in the middle of the month (let us take the 15th of the month) then we will not give him a choice to change the batch as already he has made the choice at the time of filling the form.
- At every first day of the month, the participants will get the chance to change their batch but only 1 chance in the whole month, So I have maintained a flag attribute or variable for the same in the database (In table participants, batch_changed maintains whether the participants has changed the batch this month or not).
- At every first day of the month, every participant has to pay full month yoga classes fees, that is whether he has joined on any day in the previous month, he has to pay monthly fees (i.e 500) at every new month.
- I’m also assuming that the participant will pay at any day of the month and this month’s fee will not be carried forward to the next month.


## Technologies Used

Reactjs

Nodejs

Expressjs

MySQL

## Setup
```
Database Setup

Participants Table (Stores data of the yoga class participants that have registered for the yoga classes)
Database Name :- yoga_classes.
Table Name :- participants.

Query to create table :-
CREATE TABLE `yoga_classes`.`participants` (
  `id`  int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(30) NOT NULL,
  `lastName` varchar(30) NOT NULL,
  `email` varchar(50)  NOT NULL,
  `age` int NOT NULL,
  `address` varchar(150) NOT NULL,
  `city` varchar(50) NOT NULL,
  `state` varchar(50) NOT NULL,
  `country` varchar(50) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `batch_id` int NOT NULL,
  `payment_id` int NOT NULL,
  `batch_changed` int DEFAULT 1 NOT NULL,
  `batch_changed_date` DATE NOT NULL,
   PRIMARY KEY (id),
   FOREIGN KEY (batch_id) REFERENCES batch(batch_id),
   FOREIGN KEY (payment_id) REFERENCES payments(pay_id)
);

Payments Table (Stores payment details of the yoga participant on the monthly basis)
Database Name :- yoga_classes.
Table Name :- payments.

Query to create table :-
CREATE TABLE `yoga_classes`.`payments` (
  `pay_id` int NOT NULL AUTO_INCREMENT,
  `payment_date` DATE NOT NULL,
  `amount` int  NOT NULL,
  `total_amount` int NOT NULL,
  `payment_montly_status` varchar(20) DEFAULT 'Pending',
  PRIMARY KEY(`pay_id`)
);


Batch Table (Stores pre-defined data of the batchtime of the yoga classes)
Database Name :- yoga_classes.
Table Name :- batch.

Query to create table :-
CREATE TABLE `yoga_classes`.`batch` (
  `batch_id` int NOT NULL AUTO_INCREMENT,
  `batch_time` varchar(20) NOT NULL,
   PRIMARY KEY(`batch_id`)
);

First Clone the project on our local machine 
Command :
git clone https://github.com/P-28032002/Yoga_Classes.git

Open the folder in one of your IDE

Open two new terminal and type the command :
Terminal 1 :-
cd client 
npm start
(To start the reactjs or frontend server)
Runs the app in the development mode.
Open http://localhost:3000 to view it in your browser.

Terminal 2 :-
cd server
npm run dev
(To start the nodejs or backend server)
Runs the app in the development mode.
Open http://localhost:5000 to view it in your browser.

You're good to go !!! :)
```
## ER Diagram

<img src="/Results/ER_Diagram_Yoga_Classes.png">

## Database Setup
### Participants table

<img src="/Results/Participants_table.jpg">

### Payments table 

<img src="/Results/Payment_table.jpg">

### Batch table

<img src="/Results/Batch_table.jpg">

## Results

### Enroll Form 

<img src="/Results/Enroll_form_1.jpg">
<br>
<img src="/Results/Enroll_Form_2.jpg">
<br>
<img src="/Results/Filled_form_1.jpg">
<br>
<img src="/Results/Filled_form_2.jpg">

### Validations Done on Enroll Form

<img src="/Results/Enroll_Form_validation.jpg">
<br>
<img src="/Results/Enroll_Form_validation_2.jpg">

### BatchTime Update Form

<img src="/Results/Update_form.jpg">
<br>
<img src="/Results/Update-Form_Filled.jpg">

### Validations done on BatchTime Update Form

<img src="/Results/Update_form_validation.jpg">






