
<!-- PROJECT LOGO -->
<div align="center">
  <h3 align="center">Django React Notes App</h3>

  <p align="center">
    A notes app using Django REST Framework and React Js styled using tailwind Css
    <br />
    <a href="https://github.com/coderangshu/notemaking"><strong>Explore the docs »</strong></a>
    <br />
    <!-- <a href="https://notes-django-react.up.railway.app/">View Site</a> -->
    ·
    <a href="https://github.com/coderangshu/notemaking/issues">Report Bug</a>
    ·
    <a href="https://github.com/coderangshu/notemaking/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href='#setting-up-backend-api'>Setting up Backend API</a></li>
    <li>
      <a href="#frontend-setting-up">Frontend setting up</a>
    </li>
  </ol>
</details>


## About The Project
<br>

<table width="100%"> 
<tr>

<td width="50%">
<p align="center">
Home Page Dark Mode
</p>
<img src="https://github.com/coderangshu/notemaking/blob/master/frontend/public/Home%20Page%20Dark.png">  
</td>
  <td width="50%">      
<p align="center">
Home Page Light Mode
</p>
<img src="https://github.com/coderangshu/notemaking/blob/master/frontend/public/Home%20Page%20light.png">
</td> 
</table>
<br/>

<table width="100%"> 
<tr>
<td width="50%">
<p align="center">
Note Page Dark Mode
</p>
<img src="https://github.com/coderangshu/notemaking/blob/master/frontend/public/Notes%20Dark.png">  
</td>
  <td width="50%">      
<p align="center">
Note Page Light Mode
</p>
<img src="https://github.com/coderangshu/notemaking/blob/master/frontend/public/Notes%20Ligth.png">
</td> 
</table>
<br/>


### Built With

![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)
![DjangoREST](https://img.shields.io/badge/DJANGO-REST-ff1709?style=for-the-badge&logo=django&logoColor=white&color=ff1709&labelColor=gray)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)

<br>


## Setting up Backend API 

This is a sample for Django Project.

Clone the project. This will download the GitHub respository files onto your local machine.

```Shell
git clone https://github.com/coderangshu/notemaking
```

To get this project up and running you should start by having Python installed on your computer. It's advised you create a virtual environment to store your projects dependencies separately. You can install virtualenv with

```
pip install virtualenv
```

Clone or download this repository and open it in your editor of choice. In a terminal (mac/linux) or windows terminal, run the following command in the base directory of this project

```
virtualenv venv
```

That will create a new folder `env` in your project directory. Next activate it with this command on mac/linux:

```
source venv/bin/activate
```

Then install the project dependencies with

```
pip install -r requirements.txt
```

Apply migrations and create your database
```
python manage.py migrate
```
Create a user with manage.py
```
python manage.py createsuperuser
```

Now you can run the project with this command

```
python manage.py runserver
```

<br>
<br>
<br>


## Frontend setting up

### Frontend Instructions (Create React App) 

---> Navigate to the `frontend/` directory

```Shell
cd frontend
```

---> Install the project dependencies

```Shell
npm install
```

---> Start the development server on localhost:3000

```Shell
npm start
```

---> Open your browser and navigate to either `http://localhost:3000 or http://127.0.0.1:3000`
<br>
<br>
<br>

