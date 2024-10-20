# CommUnity

## What It Does

CommUnity is a site that connects non-profit organizations to skilled local college students who can help them with projects relevant to their skills. Non-profit organizations make posts describing the projects they need help with and users describe their capabilities or filter by skills to find projects they can assist with. The non-profits get work done they might not have been able to otherwise, the students get valuable projects/experience, and the local community benefits from their work.

## What Inspired Us
<blockquote>

As computer science students we all recognize how important it is to have projects under your belt and on your resume. We also recognize the value that comes from hands-on work in our field, making you a more suitable candidate for internships and better programmer as a whole. If we had opportunities to complete projects relevant to our studies for local non-profits, we would take them! Knowing this, there must be many other students at Clark in all sorts of academic fields who feel the same, meaning local non-profits could benefit from their skilled work, benefitting their community as a whole.

</blockquote>

## What We Learned

We learned a lot about various databases, having to try several out before finding what worked for us. We also learned about openai's API and how useful it can be for data organization, especially with how dynamically it handles user inputs.

## How We Built Our Project
We used a combination of technologies and tools to bring this project to life:
- **Frontend:** [HTML, CSS]
- **Backend:** [JavaScipt, Node.js]
- **Database:** [sqlite]
- **Other Tools:** [openai API]
  
##OpenAI Utilization
We chose to utilize the openai API for several reasons:

Firstly, we wanted an easy way for users to input their skills. Instead of going through pages of specific tags and checking what applies to them, the user can just type up a description of their capabilities. Similarly, the non-profits do not need to know the ins and outs of the help they need in order to connect with students skilled in that area, just a description of what they are trying to accomplish. The format of the inputs does not matter, with our program calling the API to organize the user and each post into one of 12 set tags.

Secondly, openai helps us by taking inputs in all languages, improving the accessibility of our program vastly. Students can be connected to local non-profits no matter any language differences!

Lastly, as use of the program grows analyzing user data can show what specific skills organizations tend to look for, and openai can have many more tags to sort users and posts into based on that information. It keeps our program dynamic with growth, getting better the more it is used.

## The Challenges We Faced
Building this project wasn't without its challenges. Some of the biggest hurdles we encountered were:
- **Technical Challenge 1:** We originally created our site using Django with high-fidelity functionality, but were unable to finish all features in the time allotted. We made a low-fidelity version while keeping our back end functionality.
- **Technical Challenge 2:** We had little to no experience with JavaScript prior to the Hackathon, but ended up using it as we ran into problems linking our HTML/CSS front end to our original Python back end. It was a fun challenge to learn quickly!
- **Technical Challenge 3:** We also had little to no experience with sqlite and node.js prior to this weekend, so learning how to make use of it for our database/site was challenging but very beneficial.

We bit off a lot this Hackathon, and much of it we did not know how to implement but we worked hard to learn new things and ended up with a working product!

## Conclusion
Overall, CommUnity allowed us to grow in areas very relevant in-industry and build a site that we ourselves would use and genuinely believe in. We’re proud of the results and look forward to continuing to build on what we’ve learned and add to it's functionality in the future!
