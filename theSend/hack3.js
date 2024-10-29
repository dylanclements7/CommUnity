// OpenAI API setup
const API_KEY = "API KEY"

// OpenAI API function for generating tags
async function generateTags(description) {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: "You are an assistant in a site that connects college students with skills who want experience with projects for their resumes to non profits who need volunteers with those skills on their projects. These are the tags skills are sorted under: Technical, Design & Creative, Translation & Language, Marketing & Communications, Fundraising & Development, Event Planning & Coordination, Business & Management, Education & Training, Photography & Video, Health & Wellness, Research & Analysis, Image & Video Editing."
                },
                {
                    role: "user",
                    content: `Return only the tags relevant to the skills mentioned in this text: ${description}. Return as an array in a string, not a jsonstring.`
                }
            ]
        })
    });
    const data = await response.json();
    return data.choices[0].message.content;
}

// OpenAI API function for generating summary
async function generateSummary(description) {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: "You are an assistant in a site that connects college students with skills who want experience with projects for their resumes to non profits who need volunteers with those skills on their projects. These are the tags skills are sorted under: Technical, Design & Creative, Translation & Language, Marketing & Communications, Fundraising & Development, Event Planning & Coordination, Business & Management, Education & Training, Photography & Video, Health & Wellness, Research & Analysis, Image & Video Editing."
                },
                {
                    role: "user",
                    content: `Summarize this text in 50 characters or less: ${description}. Return as a string.`
                }
            ]
        })
    });
    const data = await response.json();
    return data.choices[0].message.content;
}

// Function to find posts with common tags
async function findPostsWithCommonTags(description) {
    const API_URL = 'http://localhost:9000/posts'
    const inputTags = new Set(JSON.parse(await generateTags(description)));
    try {
        const response = await fetch(API_URL);
        const posts = await response.json();

    const allPosts = posts;

    const matchingPosts = allPosts.filter(post => {
        const postTags = new Set(JSON.parse(post.tags));
        const commonTags = [...inputTags].filter(tag => postTags.has(tag));
        return commonTags.length > 0;
    });
    return matchingPosts.sort((a, b) => {
        const aCommonTags = [...inputTags].filter(tag => new Set(JSON.parse(a.tags)).has(tag)).length;
        const bCommonTags = [...inputTags].filter(tag => new Set(JSON.parse(b.tags)).has(tag)).length;
        return bCommonTags - aCommonTags;

    });

    
}catch (error) {
    console.error('Error adding post:', error);
}

} 

async function filter(tags){
    const API_URL = 'http://localhost:9000/posts'
    const nTags = new Set(tags);
    try {
        const response = await fetch(API_URL);
        const posts= await response.json();
        console.log(JSON.parse(posts[0].tags))
        const matchingPosts = posts.filter(post => {
            const postTags = new Set(JSON.parse(post.tags));
            const commonTags = [...tags].filter(tag => postTags.has(tag));
            return commonTags.length > 0;
        });

        const rv = matchingPosts.sort((a, b) => {
            const aCommonTags = [...tags].filter(tag => new Set(JSON.parse(a.tags)).has(tag)).length;
            const bCommonTags = [...tags].filter(tag => new Set(JSON.parse(b.tags)).has(tag)).length;
            return bCommonTags - aCommonTags;
    
        });

        console.log(rv);
        return rv;
    

    }catch(error){
        console.error(error)
    }
}

function createPostExpansion(){ 
    const closedPosts = document.querySelectorAll(".closed-post")
    closedPosts.forEach(cpost =>{
        cpost.addEventListener('click',()=>{
            post = cpost.parentElement
                
            let target = post.querySelector(".expanded-post")
            let exit = post.querySelector(".post-exit")
            target.classList.add('expanded')
            post.classList.add('expanded')
            exit.classList.add('expanded')


    })
})

}


function createPostExit(){ 
    const xOut = document.querySelectorAll(".post-exit")
    xOut.forEach(x =>{
        x.addEventListener('click', ()=>{
        
            let expanded = document.querySelectorAll(".expanded")
            expanded.forEach(post =>{
                
                post.classList.remove('expanded')
    
            })
    
            })
    })
   

}


function createTabs() { 
    const tabs = document.querySelectorAll('[data-tab-target]');
    const activeContent = document.querySelectorAll('[id^="project-finder"], [id^="post-maker-page"]'); // Updated selector

    tabs.forEach(tab => {
        const targetSelector = tab.dataset.tabTarget;
        const target = document.getElementById(targetSelector); // Use getElementById
        
        tab.addEventListener('click', () => {
            // Hide all content
            activeContent.forEach(content => {
                content.classList.remove('active');
            });
            // Show the clicked tab's content
            if (target) {
                target.classList.add('active');
            }
            // Remove active class from all tabs
            tabs.forEach(tb => {
                tb.classList.remove('active');
            });
            // Add active class to the clicked tab
            tab.classList.add('active');
        });
    });
}

async function createPostFormSubmission(){
    
    document.getElementById('post-form').addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent the default form submission

        const title = this.querySelectorAll('textarea')[0].value; // Title
        const email = this.querySelectorAll('textarea')[1].value; // Email
        const address = this.querySelectorAll('textarea')[2].value; //address
        const description = this.querySelectorAll('textarea')[3].value; // Description
        let form = document.querySelector("#post-form")
    
            form.querySelectorAll('.input-box').forEach(ta => {
                textarea = ta.querySelector('textarea')
                textarea.value = ''; // Clear the value
            })

        const API_URL = 'http://localhost:9000/posts';


            const postData = {
    
                //title: document.getElementById('title').value,
                title: title,
                roleDescription: description,
                tags:await generateTags(description) ,
                streetAddress: address,
                emailAddress: email,
                summary: await generateSummary(description) 
            };

            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(postData)
                });
                const data = await response.json();
                console.log('Post added with ID:', data.id);
            } catch (error) {
                console.error('Error adding post:', error);
            }
        
        });

        
}

function createSkillSubmission(){
    
    document.getElementById('skills-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        const description = this.querySelectorAll('textarea')[0].value; // Description
        displayPosts(description)

        this.querySelectorAll('textarea').forEach(textarea => {
            textarea.value = ''; // Clear the value
        })
    })
    
}

function replaceSpaces(string){
    let newSt = ""
    for (let i = 0; i < string.length; i++) {
        if(string[i] === " "){
            newSt += "+"
        }else{
            newSt += string[i]
        }

    }
    return newSt
}

function makePost(title,description,email,summary,address){ 
    const feed = document.querySelector("#post-feed")
    const template = document.querySelector("#post-template")
    const newPost = template.content.cloneNode(true)
    newPost.querySelector(".post-header-text").textContent = title
    newPost.querySelector(".post-summary-text").textContent = summary 
    newPost.querySelector( ".post-description-text").textContent = description
    let ref = "mailto: " + email
    newPost.querySelector(  ".email-link").href = ref
    let src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAgKNPSYplo6yeWjU312bEI-7gYk1Tieu8&q="
    let newSrc = src + replaceSpaces(address)
    newPost.querySelector( ".map").src = newSrc
    feed.appendChild(newPost)
    createPostExpansion() 
    createPostExit()

}

async function postAll(){ 
    const API_URL = 'http://localhost:9000/posts'
    try {
        const response = await fetch(API_URL);
        const posts = await response.json();
        posts.reverse().forEach(post =>{
            makePost(post.title,post.roleDescription,post.emailAddress,post.summary,post.streetAddress)
        })
    }catch(error){
    }
   
}
async function displayPosts(description){ 
        data = await findPostsWithCommonTags(description)
        feed = document.querySelector("#post-feed")
        posts = feed.querySelectorAll(".post")
        posts.forEach(pt => {
            pt.remove()
        })

        data.forEach(post =>{
            makePost(post.title,post.roleDescription,post.emailAddress,post.summary,post.streetAddress)
        })
    }

async function displayPostsFromList(list){ 
    data = await list
    console.log("LIST,",list)
    feed = document.querySelector("#post-feed")
    posts = feed.querySelectorAll(".post")
    posts.forEach(pt => {
        pt.remove()
    })

    data.forEach(post =>{
        makePost(post.title,post.roleDescription,post.emailAddress,post.summary,post.streetAddress)
    })
        
} 

function filterSetup() {
    document.querySelector(".submit-btn").addEventListener('click', async function() {
        const selectedFilters = Array.from(document.querySelectorAll('input[name="filters"]:checked'))
                                     .map(checkbox => checkbox.value);
        
        await displayPostsFromList(filter(selectedFilters.toString()))
    });
}


async function initiate(){
    var postData
    var userDescription
    filterSetup()
    createPostExpansion() 
    createPostExit()
    createTabs()
    createPostFormSubmission()
    createSkillSubmission()
    await postAll()
    
}

// Call the function after the DOM content has loaded
document.addEventListener('DOMContentLoaded', initiate);
