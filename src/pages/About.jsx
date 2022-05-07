import React from 'react'
import profile from './../assets/images/tal-profile.jpg'
import { SocialContainer } from '../components/SocialContainer'

export const About = () => {
  return (
    <>
      <section className='about flex'>
        <header className='flex'>
          <img src={profile} alt='tal-amit-profile' />
          <div className='info'>
            <h1>Tal Amit</h1>
            <h2>Full-Stack Developer </h2>
            <p>
              Graduate of Coding Academy Bootcamp – 640 hours full-stack course.
              Frontend: Vue.js options/composition API with Vex, React.js, class
              & function (hooks) components with Redux, Angular12, Typescript,
              javaScript ES6^. CSS, Sass, and responsive, mobile first web
              design. Backend: Node.js with Express, REST API's. Data bases:
              Mongo DB, SQL Other: Authentication with Express session and JWT,
              PWA, php. SSR
            </p>
          </div>
        </header>
        <div className='project-info'>
          <h4>Project inspiration</h4>
          <p>
            This project was inspired by Google's advanced notes app, Google
            Keep. Using the app you can save several types of notes: Text, Todo
            List, photos, voice recordings and canvas painting.
          </p>
          <h4>Project features</h4>
          <p>
            The user can perform full CRUD operations on each note. Delete edit,
            duplicate, change color and more. The editing feature of the note is
            within inline and allows for a pleasant and intuitive user
            experience.
          </p>
          <h4>Project technologies</h4>
          <p>
            In this project I used React version 18. The whole project was
            written using function components with hooks. The project has a
            front-end service that knows how to accurately handle requests from
            the user and allow for a smooth, fast experience and clean code. To
            manage the state in the app I used REDUX. This is a responsive
            project and is suitable for use on desktop and mobile.
          </p>
        </div>

        <SocialContainer />
      </section>
    </>
  )
}
