# Sprint 2 video link: https://drive.google.com/file/d/1avB546ALnl1ENuSHVKLRP8iy1TigEc9L/view?usp=drive_link

# Team Members and Roles
Name | ID | Github | Role | Background
--- | --- | --- | --- | -- 
Adib Akkari | 40216815 | adssib | Team Leader, backend developer | Software engineer student doing a backend internship while taking the course 
Steven Gourgy | 40213440 | MCSTEVE1000 | Full Stack developer | experienced in front end development and data science
Valentin Gornostaev | 40211600 | Valentino514 |  Database developer, backend developer | Experience in Rest API development and Databases
Bhumika Bhumika | 40223877 | bhumi-0902 | Frontend developer | A software engineering student skilled in creating projects utilizing front-end development techniques.
Houssam Ait Idir | 40155665 | Houssam154 | Frontend  |Computer engineering student with a bit of experience in front-end


# Description of the project 
We are going to develop a Prototype for car rental websites using Scrum agile methodology. 
We are going to use a variety of front and backend frameworks to develop this prototype. We will be using different APIs and frameworks to communicate between front-end end and Backend 

# extra links
[Link for Meeting Minutes Spread Sheet](https://liveconcordia-my.sharepoint.com/:x:/g/personal/h_aitidi_live_concordia_ca/EZLWG--Jm5dPusCuZGsbBJkBjbDpXm2QouSt52PzoB9_5A?e=t7JhIi) 

[Link for Members Contributions](https://1drv.ms/x/s!ApXMEtybGLIPmQ2fBPMcKYCOQS1C?e=nM8m03)


# How to run the repositry?

## Getting Started

This project has been written in Django as Backend and React in frontend.

You need to check if they are installed on your app. 

checking if python is installed on your machine:
```bash
python --version
```

checking if npm is installed on your machine (you need npm do start React Projects) :
```bash
npm --version
```

## How to Run the project?

After cloning the repository on your machine its time to run it using these commands: 

Make sure you are on the Working Folder

```bash
cd 2Legit2Quit-soen341W2024
```

### Activating the Backend

Create a Virtual Environment

Download Virtual Environment using pip:

```bash
pip install virtualenv
```
Create a virtual environment using Python's venv module:

```bash
python -m venv venv
```

Sometimes You need to allow Scripts everytime you want to activate the virtual environment

USe this command to do so: 

```bash
Set-ExecutionPolicy Unrestricted -Scope Process
```

Activate the virtual environment:
```bash
.\venv\Scripts\activate  # On Windows
source venv/bin/activate  # On macOS/Linux
```

Then, go to the BackEnd directory

```bash
cd Backend
```

install Backend dependencies 

```bash
pip install -r requirements.txt
```
To start it: 

```bash
python manage.py runserver
```
### Creating a superuser

If you are unable to login to the backend framework, run this command in your backend terminal to create a new user

```bash
python manage.py createsuperuser
```
It will prompt you to create a username, an email and password. After you finish, run the backend server again and use your email as the username and the password you just created.

### Activating the Frontend

```bash
cd Frontend
```

install Frontend dependencies 

```bash 
npm install 
```

For the reservation functionalities, this is also important to install:
```bash
npm install react-datepicker 
```
To start it: 

```bash
npm start
```
