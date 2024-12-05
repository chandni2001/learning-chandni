import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  courses = [
    {
        "id": 7,
        "name": "NodeJs and Express Course",
        "description": "<h6 style = \"margin-bottom:2px;margin-top:8px\"> NodeJs Fundamentals</h6> \t\tYou will start learning fundamentals of nodejs, Event Loop, and Single threaded nature of NodeJs. You will start making simple node app understanding how to create apps from node functions. \t  <h6 style = \"margin-bottom:2px;margin-top:8px\"> using plain express, Get, POST and forms</h6> \t\tThis module you will learn about express framework, learn how to create web app with GEt and POST request,getting data from url using GET and forms using post, understand the entire cycle of GET and POST. \t\t<h6 style = \"margin-bottom:2px;margin-top:8px\"> Using Express Generator</h6> \t\tIn this module, you will learn how to use express-generator. With express generator, you will be able to create apps with industry level architecture. you will undrestand how big and scalable apps are created in node. \t\t<h6 style = \"margin-bottom:2px;margin-top:8px\">  Express Routing</h6> \t\tyou will code how to implement routing for express applications, create nested routes, pass parameters.this will help you master creating Rest API with parameters \t\t\t\t<h6 style = \"margin-bottom:2px;margin-top:8px\"> MongodDB Module</h6> \t\t\t\tThis module will teach you setting up MongoDb, Running queries, creating collections, creating database, deletion, search in Mongo Database.  \t  <h6 style = \"margin-bottom:2px;margin-top:8px\">Database Connection and using Mongoose ORM</h6> \t\tYOu will first learn how to connect to database for express apps, run queries.Then you will learn how to use ORM Mongoose to get data from database. you will learn fundamentals of ORM and why we use ORM in industry projects. you will create classes to map to tables, uderstand how to add data to tables, delete and update.  \t\t<h6 style = \"margin-bottom:2px;margin-top:8px\"> Undrstanding joins and relations in Mongoose/MongoDB</h6> \t\tIn real world, you have complex mongodDB Collections. This module will teach you how to create complex relations for mongoDB ,fetch ,update and do CRUD operations. After this module you will be able to create complex real worlds APIs. \t\t\t\t<h6 style = \"margin-bottom:2px;margin-top:8px\"> Authentication and Encryption</h6> \t\t\t\tThis module will teach you about password hashing, encryption and how to create a secure Login API with authentication. you will learn how to create actual secure login API. \t\t<h6 style = \"margin-bottom:2px;margin-top:8px\"> NodeJs Advanced Topics, Clusters, Middlewares</h6> \t\tThis advanced module will make u unde",
        "category": 5,
        "image": "https://skillcone.s3.amazonaws.com/Media/images/nodejs_courseimg_resize.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQ5H65XWT6LRTFOMS%2F20240821%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240821T085514Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=8a9f57b8bf81aa7d9fa6119cea008addf33444f7dd22ae7f5990bc1bb2781e1a",
        "price": 22000.0,
        "instructor": 3,
        "active": true,
        "finished": true,
        "created_at": "2023-07-08T10:14:57.582213Z",
        "updated_at": "2023-09-07T15:36:56.218600Z",
        "category_name": "Backend",
        "credit_cost": 90,
        "syllabus": "[{\"heading\":\"ECMA6 & Adv Javascript\",\"contents\":[{\"title\":\"Object Oriented Javascript\"}, \t{\"title\":\"Javascript Closures in Depth\"},{\"title\":\"Constructor Functions and Prototypes\"}, \t{\"title\":\"ECMA6 Classes & Inheritance \"},{\"title\":\"Object & Array Destructuring\"} \t]},{\"heading\"\t:\"React Introduction\", \t\"contents\":[{\"title\":\"Npm Packages, React CLI\"},{\"title\":\"JSX Introduction\"},{\"title\":\"Intro to functional Components\"}, \t{\"title\":\"Virtual DOM,useState and useEffect\"},{\"title\":\"React Props and State\"}]}, {\"heading\":\" Forms,Hooks and Router\",\"contents\":[{\"title\":\"Working with Forms & DOM\"},{\"title\":\"Lifting states & props\"},{\"title\":\"React Routing and Params\"},{\"title\":\"Nested Routes and Adv Routing\"}]}, { \"heading\":\"Server Communication\",\"contents\":[{\"title\":\"Understanding REST\"},{\"title\":\"Making GET & POST Requests\"},{\"title\":\"PUT & Delete Requests\"},{\"title\":\"Making FUll CRUD API\"}]}, { \"heading\":\"Authentication & Adv Hooks\",\"contents\":[{\"title\":\"Understanding JWT\"},{\"title\":\"Creating Login with JWT\"},{\"title\":\"useMemo,useContext,useCallback\"},{\"title\":\"Making FUll CRUD API\"},{\"title\":\"Working with File Upload\"}]}, { \"heading\":\"Redux & Adv react\",\"contents\":[{\"title\":\"Understanding why Redux\"},{\"title\":\"Actions, Reducers & Providers\"},{\"title\":\"Ecommerce App with Redux\"},{\"title\":\"Securing React Application\"},{\"title\":\"Optimizing React App\"}]}, { \"heading\":\"Unit Testing\",\"contents\":[{\"title\":\"Setting up Jest\"},{\"title\":\"Creating Unit tests\"},{\"title\":\"testing components\"},{\"title\":\"Unit testing with Mocks\"},{\"title\":\"Integration Testing\"}]}, { \"heading\":\"Live Project 2 Months\",\"contents\":[{\"title\":\"Working with GIT\"},{\"title\":\"Coding Practices\"},{\"title\":\"Agile Development and Daily Tasks\"},{\"title\":\"Working with Material UI \"},{\"title\":\"Deployment and Making Projects Live\"},{\"title\":\"Working with Docker and AWS\"}]} ]"
    },
    {
        "id": 6,
        "name": "Full Stack Course",
        "description": "<h6 style = \"margin-bottom:2px;margin-top:8px\"> UI Fundamentals- HTML5, CSS3, Javacript.</h6> \t\tFirst you will learn HTML5 and important API like GeoLocation, LocalStorage, Semantic tags and forms.You then move to CSS and CSS3 learning how to create responsive web pages. Then you will learn bootstrap, grid system and how to create mobile responsive websites using bootstrap. Then you move to mastering basic Javascript, creating web apps and applications using javascript. \t  <h6 style = \"margin-bottom:2px;margin-top:8px\"> Advanced Javascript</h6> \t\tThis module is a very important module teaching you about advanced javascript, prototypes, Classes, Objects, String, arrays and objects manipulations and createing classes using function constructor. \t\t<h6 style = \"margin-bottom:2px;margin-top:8px\"> ReactJS</h6> \t\tThis is a complete module to make you master in Front end development using react. you will learn from basics to very advanced topics and will master how to create real web applications using ReactJS \t\t<h6 style = \"margin-bottom:2px;margin-top:8px\">  Redux and Thunk</h6> \t\tReal world applications use Redux a lot. This module will make you master in Redux and using redux in react application. You will learn how to use Thunk library to make asycnchronus requests in Redux. \t\t\t\t<h6 style = \"margin-bottom:2px;margin-top:8px\">NOdeJs</h6> \t\tYou will start learning fundamentals of nodejs, Event Loop, and Single threaded nature of NodeJs. You will start making simple node app understanding how to create apps from node functions. \t\tyou will learn about express framework, learn how to create web app with GEt and POST request,getting data from url using GET and forms using post, understand the entire cycle of GET and POST.  \t  <h6 style = \"margin-bottom:2px;margin-top:8px\">Database Connection and using Mongoose ORM, Express</h6> \t\tYOu will first learn how to connect to database for express apps, run queries.Then you will learn how to use ORM Mongoose to get data from database. you will learn fundamentals of ORM and why we use ORM in industry projects. you will create classes to map to tables, uderstand how to add data to tables, delete and update.  \t\t<h6 style = \"margin-bottom:2px;margin-top:8px\"> Undrstanding joins and relations in Mongoose/MongoDB</h6> \t\tIn real world, you have complex mongodDB Collections. This module will teach you how to create complex relations for mongoDB ,fetch ,update and do CRUD operations. After this module you will be able to create co",
        "category": 1,
        "image": "https://skillcone.s3.amazonaws.com/Media/images/fullstack_course_banner_skillcone_resize.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQ5H65XWT6LRTFOMS%2F20240821%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240821T085514Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=9ac906dd52671fc62b2c1d42e8a67d811a655eace8657f72d0570e44d13532e3",
        "price": 34000.0,
        "instructor": 3,
        "active": true,
        "finished": true,
        "created_at": "2023-07-08T09:40:55.842875Z",
        "updated_at": "2023-09-07T15:00:08.438632Z",
        "category_name": "Front End",
        "credit_cost": 90,
        "syllabus": "[ \t{ \t\t\"heading\": \"Basic UI- HTML5 CSS3, Bootstrap\", \t\t\"contents\": [ \t\t\t{ \"title\": \"HTML5 Introduction, Semantic Tags\" }, \t\t\t{ \"title\": \"HTML5 Forms,GeoLocation, Video tag\" }, \t\t\t{ \"title\": \"CSS3 Introduction,Flexbox, Responsive Design\" }, \t\t\t{ \"title\": \"FlexBox, Create Responsive Websites\" }, \t\t\t{ \"title\": \"Introduction to bootstrap\" }, \t\t\t{ \"title\": \"Bootstrap Grids, Carousel, images\" } \t\t] \t}, \t{ \t\t\"heading\": \"Javascript\", \t\t\"contents\": [ \t\t\t{ \"title\": \"Introduction to Javascript\" }, \t\t\t{ \"title\": \"variables let vs var,const,loops,if else,Arrays\" }, \t\t\t{ \"title\": \"Javascript functions in depth\" }, \t\t\t{ \"title\": \"DOM, Indepth of DOM\" } \t\t] \t}, \t{ \t\t\"heading\": \"Advanced Javascript & Objects, ECMA6\", \t\t\"contents\": [ \t\t\t{ \"title\": \"Introduction to objects,classes\" }, \t\t\t{ \"title\": \"Prototypes,Application\" }, \t\t\t{ \"title\": \"ECMA6 Classes,Destructors,operators\" }, \t\t\t{ \"title\": \"bind,apply,memory managment\" } \t\t] \t}, \t{ \t\t\"heading\": \"ReactJs\", \t\t\"contents\": [ \t\t\t{ \"title\": \"Npm Packages, React CLI\" }, \t\t\t{ \"title\": \"JSX Introduction\" }, \t\t\t{ \"title\": \"Intro to functional Components\" }, \t\t\t{ \"title\": \"Virtual DOM,useState and useEffect\" }, \t\t\t{ \"title\": \"React Props and State\" }, \t\t\t{ \"title\": \"Working with Forms & DOM\" }, \t\t\t{ \"title\": \"Lifting states & props\" }, \t\t\t{ \"title\": \"React Routing and Params\" }, \t\t\t{ \"title\": \"Nested Routes and Adv Routing\" }, \t\t\t{ \"title\": \"Understanding JWT\" }, \t\t\t{ \"title\": \"Creating Login with JWT\" }, \t\t\t{ \"title\": \"useMemo,useContext,useCallback\" }, \t\t\t{ \"title\": \"Making FUll CRUD API\" }, \t\t\t{ \"title\": \"Working with File Upload\" }, \t\t\t{ \"title\": \"Understanding why Redux\" }, \t\t\t{ \"title\": \"Actions, Reducers & Providers\" }, \t\t\t{ \"title\": \"Ecommerce App with Redux\" }, \t\t\t{ \"title\": \"Securing React Application\" }, \t\t\t{ \"title\": \"Optimizing React App\" }, \t\t\t{ \"title\": \"Creating Unit tests\" }, \t\t\t{ \"title\": \"testing components\" }, \t\t\t{ \"title\": \"Unit testing with Mocks\" } \t\t] \t} ]"
    },
    {
        "id": 1,
        "name": "React & Redux Practical Training",
        "description": "<h6 style = \"margin-bottom:2px;margin-top:8px\"> React Fundamentals</h6> \t\tYou will learn React from the basics starting with ECMA6, operators  and then you will learn how we can create components and basic web pages in react. you will learn how react works internally.  \t  <h6 style = \"margin-bottom:2px;margin-top:8px\">  Understanding State and Hooks in react</h6> \t\tNext you will learn how to use hooks in react like useState, useEffect and advanced hooks.This will give you good understanding of how to make dynamic web apps with react.  \t\t<h6 style = \"margin-bottom:2px;margin-top:8px\">  Form Handling</h6> \t\tYou will then learn basic and advanced form handling and creating simple and complex forms used in real world web application.  \t\t<h6 style = \"margin-bottom:2px;margin-top:8px\">  Server Communication and REST API Integration</h6> \t\tYou will learn how to get data from server using axios, make post, get, delete and put requests.  \t  <h6 style = \"margin-bottom:2px;margin-top:8px\"> Single page Routing, Complex Routing</h6> \t\tIn this module you will understand about Routers and learn creating simple and complex nested routes.  \t\t<h6 style = \"margin-bottom:2px;margin-top:8px\"> Redux , Alternative central State managment solution</h6> \t\tYou move on to Redux and learn how to implement Redux in projects.you learn how to integrate redux using reducers, actions and state from basics to advanced \t\t<h6 style = \"margin-bottom:2px;margin-top:8px\">  React Security, Optimization and deployment</h6> \t\tIn the end you learn how to create secure apps and how to deploy React applications in live servers.  \t\t<h6 style = \"margin-bottom:2px;margin-top:8px\"> Industry Live Project</h6> \t\tFinally you move to React Live project for 2 months mastering how to code in Industry level projects.",
        "category": 1,
        "image": "https://skillcone.s3.amazonaws.com/Media/images/reactjs_courseimg_resize_three.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQ5H65XWT6LRTFOMS%2F20240821%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240821T085514Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=bd6562d316b5477bead01ad0beed0d7d8ac2e5a4c137c17c6dd0c192f8df1df5",
        "price": 20000.0,
        "instructor": 3,
        "active": true,
        "finished": true,
        "created_at": "2023-04-03T09:49:58.080310Z",
        "updated_at": "2023-09-19T10:02:29.313918Z",
        "category_name": "Front End",
        "credit_cost": 10,
        "syllabus": "[{\"heading\":\"ECMA6 & Adv Javascript\",\"contents\":[{\"title\":\"Object Oriented Javascript\"}, \t{\"title\":\"Javascript Closures in Depth\"},{\"title\":\"Constructor Functions and Prototypes\"}, \t{\"title\":\"ECMA6 Classes & Inheritance \"},{\"title\":\"Object & Array Destructuring\"} \t]},{\"heading\"\t:\"React Introduction\", \t\"contents\":[{\"title\":\"Npm Packages, React CLI\"},{\"title\":\"JSX Introduction\"},{\"title\":\"Intro to functional Components\"}, \t{\"title\":\"Virtual DOM,useState and useEffect\"},{\"title\":\"React Props and State\"}]}, {\"heading\":\" Forms,Hooks and Router\",\"contents\":[{\"title\":\"Working with Forms & DOM\"},{\"title\":\"Lifting states & props\"},{\"title\":\"React Routing and Params\"},{\"title\":\"Nested Routes and Adv Routing\"}]}, { \"heading\":\"Server Communication\",\"contents\":[{\"title\":\"Understanding REST\"},{\"title\":\"Making GET & POST Requests\"},{\"title\":\"PUT & Delete Requests\"},{\"title\":\"Making FUll CRUD API\"}]}, { \"heading\":\"Authentication & Adv Hooks\",\"contents\":[{\"title\":\"Understanding JWT\"},{\"title\":\"Creating Login with JWT\"},{\"title\":\"useMemo,useContext,useCallback\"},{\"title\":\"Making FUll CRUD API\"},{\"title\":\"Working with File Upload\"}]}, { \"heading\":\"Redux & Adv react\",\"contents\":[{\"title\":\"Understanding why Redux\"},{\"title\":\"Actions, Reducers & Providers\"},{\"title\":\"Ecommerce App with Redux\"},{\"title\":\"Securing React Application\"},{\"title\":\"Optimizing React App\"}]}, { \"heading\":\"Unit Testing\",\"contents\":[{\"title\":\"Setting up Jest\"},{\"title\":\"Creating Unit tests\"},{\"title\":\"testing components\"},{\"title\":\"Unit testing with Mocks\"},{\"title\":\"Integration Testing\"}]}, { \"heading\":\"Live Project 2 Months\",\"contents\":[{\"title\":\"Working with GIT\"},{\"title\":\"Coding Practices\"},{\"title\":\"Agile Development and Daily Tasks\"},{\"title\":\"Working with Material UI \"},{\"title\":\"Deployment and Making Projects Live\"},{\"title\":\"Working with Docker and AWS\"}]} ]"
    },
    {
        "id": 8,
        "name": "FullStack July 2023 Morning Batch",
        "description": "This Course is for Online Classroom students",
        "category": 3,
        "image": "https://skillcone.s3.amazonaws.com/Media/images/skillcone_ad_15_08_23_rectangle__shape_1.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQ5H65XWT6LRTFOMS%2F20240821%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240821T085514Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=342ea7e29d2e7dabd5437acfe67f646853cb19f3fff23928e50e649fe50d473d",
        "price": 34000.0,
        "instructor": 3,
        "active": true,
        "finished": true,
        "created_at": "2023-09-22T04:21:30.531139Z",
        "updated_at": "2023-09-22T04:27:33.792242Z",
        "category_name": "Full Stack",
        "credit_cost": 90,
        "syllabus": null
    },
    {
        "id": 17,
        "name": "Corporate MERN Stack Batch",
        "description": "Corporate MERN Stack Batch for companies",
        "category": 3,
        "image": "https://skillcone.s3.amazonaws.com/Media/images/SKillcone.com__MERN_STACK__13_1_24.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQ5H65XWT6LRTFOMS%2F20240821%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240821T085514Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=83cbef53a4583ab2236a8ccda4c27c308fc132cf889a35cee81495385977942d",
        "price": 20000.0,
        "instructor": 3,
        "active": true,
        "finished": true,
        "created_at": "2024-07-18T07:17:01.704398Z",
        "updated_at": "2024-07-18T10:16:21.831821Z",
        "category_name": "Full Stack",
        "credit_cost": 1,
        "syllabus": null
    },
    {
        "id": 12,
        "name": "FullStack Nov 23 Eve Batch",
        "description": "FullStack No 23 Batch for evening students",
        "category": 4,
        "image": "https://skillcone.s3.amazonaws.com/Media/images/SKillcone.com_FullStack__Ad_7_11_23_.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQ5H65XWT6LRTFOMS%2F20240821%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240821T085514Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=88057d9591524e90723dce9658bff99cc4fa43603b5b9b3b747f0ccd35fadca5",
        "price": 28999.0,
        "instructor": 3,
        "active": true,
        "finished": true,
        "created_at": "2023-11-20T06:25:56.774809Z",
        "updated_at": "2023-11-20T06:31:26.180839Z",
        "category_name": "Full Stack with React & Node",
        "credit_cost": 0,
        "syllabus": null
    },
    {
        "id": 18,
        "name": "FullStack Beginners July 24 Batch",
        "description": "FullStack Beginners July 24 Batch",
        "category": 3,
        "image": "https://skillcone.s3.amazonaws.com/Media/images/SKillcone.com__MERN_STACK__9_07_24.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQ5H65XWT6LRTFOMS%2F20240821%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240821T085514Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=0a59e48788764d17920ef067aee78680cca51260eb7f71780203a5134da3317b",
        "price": 30000.0,
        "instructor": 3,
        "active": true,
        "finished": true,
        "created_at": "2024-07-23T14:01:49.992919Z",
        "updated_at": "2024-07-23T14:15:04.653186Z",
        "category_name": "Full Stack",
        "credit_cost": 0,
        "syllabus": null
    },
    {
        "id": 13,
        "name": "Advanced Javascript",
        "description": "This course covers advanced in-depth fundamentals of javascript",
        "category": 1,
        "image": "https://skillcone.s3.amazonaws.com/Media/images/Untitled_3.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQ5H65XWT6LRTFOMS%2F20240821%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240821T085514Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=04b407bcdc5cda5b318712a093f99f3cfd4b3a4d137dc7091a2d7ba722f98555",
        "price": 1000.0,
        "instructor": 3,
        "active": true,
        "finished": true,
        "created_at": "2023-11-21T04:41:12.208662Z",
        "updated_at": "2023-11-21T04:48:11.572960Z",
        "category_name": "Front End",
        "credit_cost": 100,
        "syllabus": null
    },
    {
        "id": 11,
        "name": "React Self Paced Course",
        "description": "Cover Functional Components, Hooks, React Forms and Server Integrations",
        "category": 1,
        "image": "https://skillcone.s3.amazonaws.com/Media/images/SKillcone.com_React_Self_paced_Course_Banner__2_12_23__1.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQ5H65XWT6LRTFOMS%2F20240821%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240821T085514Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=49ac463ca2428ef681fd6b550e9b48efa5be5134f0e677ea5caa2028463aceff",
        "price": 799.0,
        "instructor": 3,
        "active": true,
        "finished": true,
        "created_at": "2023-11-01T14:06:26.787341Z",
        "updated_at": "2023-12-02T05:45:41.539821Z",
        "category_name": "Front End",
        "credit_cost": 90,
        "syllabus": null
    },
    {
        "id": 16,
        "name": "NodeJs June 24 Batch",
        "description": "NodeJs June 24 Batch",
        "category": 5,
        "image": "https://skillcone.s3.amazonaws.com/Media/images/nodejs_courseimage.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQ5H65XWT6LRTFOMS%2F20240821%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240821T085514Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=af596f1611035e9f7f6a082874106f45410c6a6e7f18ba25077233c68b9f285a",
        "price": 1000.0,
        "instructor": 3,
        "active": true,
        "finished": true,
        "created_at": "2024-06-27T03:53:40.759896Z",
        "updated_at": "2024-06-29T11:00:13.671741Z",
        "category_name": "Backend",
        "credit_cost": 90,
        "syllabus": "[{\"heading\":\"ECMA6 & Adv Javascript\",\"contents\":[{\"title\":\"Object Oriented Javascript\"}, \t{\"title\":\"Javascript Closures in Depth\"},{\"title\":\"Constructor Functions and Prototypes\"}, \t{\"title\":\"ECMA6 Classes & Inheritance \"},{\"title\":\"Object & Array Destructuring\"} \t]},{\"heading\"\t:\"React Introduction\", \t\"contents\":[{\"title\":\"Npm Packages, React CLI\"},{\"title\":\"JSX Introduction\"},{\"title\":\"Intro to functional Components\"}, \t{\"title\":\"Virtual DOM,useState and useEffect\"},{\"title\":\"React Props and State\"}]}, {\"heading\":\" Forms,Hooks and Router\",\"contents\":[{\"title\":\"Working with Forms & DOM\"},{\"title\":\"Lifting states & props\"},{\"title\":\"React Routing and Params\"},{\"title\":\"Nested Routes and Adv Routing\"}]}, { \"heading\":\"Server Communication\",\"contents\":[{\"title\":\"Understanding REST\"},{\"title\":\"Making GET & POST Requests\"},{\"title\":\"PUT & Delete Requests\"},{\"title\":\"Making FUll CRUD API\"}]}, { \"heading\":\"Authentication & Adv Hooks\",\"contents\":[{\"title\":\"Understanding JWT\"},{\"title\":\"Creating Login with JWT\"},{\"titl"
    }
]

  constructor() { }

  ngOnInit(): void {
  }

}
