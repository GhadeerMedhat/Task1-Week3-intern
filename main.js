let slides = [];
let currentIndex = 0;
let sliderContainer = document.getElementById('slider-container');
let autoplayButton = document.getElementById('autoplayBtn');

fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => {
        slides = data.map(post => ({
            id: post.id,
            title: post.title,
            body: post.body,
            url: 'https://via.placeholder.com/500x300?text=' + post.id + '-' + post.title + '-' + post.body,
        }));
        appendSlides();
        showSlide(currentIndex); 
    })
    .catch(error => console.error('Error fetching posts:', error));

// Function to show a specific slide based on index
function showSlide(index) {
    let slides = document.querySelectorAll('.slide');
    slides.forEach(function(slide) {
        slide.style.display = 'none';
    });
    if (index < 0) {
        currentIndex = slides.length - 1; 
    } else if (index >= slides.length) {
        currentIndex = 0;
    } else {
        currentIndex = index; 
    }
    slides[currentIndex].style.display = 'block'; 
}

function prevSlide() {
    toggleButtonColor();
    showSlide(currentIndex - 1);
}

function nextSlide() {
    toggleButtonColor();
    showSlide(currentIndex + 1);
}

function randomSlide() {
    toggleButtonColor();
    let randomIndex = Math.floor(Math.random() * slides.length);
    showSlide(randomIndex);
}

let autoplayInterval;

function toggleAutoplay() {
    if (autoplayInterval) {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
    } else {
        autoplayInterval = setInterval(nextSlide, 1000);
    }
    toggleButtonColor();
}

function toggleButtonColor() {
    if (autoplayInterval) {
        autoplayButton.style.backgroundColor = 'red';
    } else {
        autoplayButton.style.backgroundColor = 'green';
    }
}

    function appendSlides() {
        slides.forEach(function(slide) {
            let slideDiv = document.createElement('div'); 
            slideDiv.classList.add('slide');
    
            let img = document.createElement('img');
            img.src = slide.url;
            img.dataset.id = slide.id; 
            img.classList.add('slide-image', slide.styleClass);
    
          
            let title = document.createElement('h2');
            title.textContent = ` ${slide.id} - ${slide.title}`; 
    
   
            let body = document.createElement('p');
            body.textContent = ` ${slide.body}`;
           
            slideDiv.appendChild(img);
            slideDiv.appendChild(title);
            slideDiv.appendChild(body);
    
            sliderContainer.appendChild(slideDiv);
        });
    }