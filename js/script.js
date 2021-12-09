const key = '5fa28262f31acb330c40f96cd8f2b6fa';

const inputkeyword = document.getElementById('inputkeyword');
const inputsize = document.getElementById('inputsize');
const inputamount = document.getElementById('inputamount');
const userSubmit = document.getElementById('userSubmit');
const loopLoad = document.getElementById('loading');
const innerCaro = document.querySelector('.carousel-inner');
loopLoad.style.display = 'none';

userSubmit.addEventListener('click', function (e) {
    e.preventDefault();
    console.log(userSubmit);
    
    url = `https://www.flickr.com/services/rest/?api_key=${key}&method=flickr.photos.search&text=${inputkeyword.value}&sort=relevance&safe_search=1&accuracy=1&content_type=1&format=json&nojsoncallback=1&per_page=${inputamount.value}&page=1`;
    
    loadingLoop();
    console.log(loadingLoop);
  
    function errorMessage() {
        if (inputkeyword.value === '' || inputamount.value === '') {
            console.log('no input');
            let h2 = document.createElement('h2');
            document.body.appendChild(h2);
            h2.innerText = 'Dont forget to fill out all of the boxes!';
            h2.style.textAlign = 'center';  
        }
    }

    if (inputkeyword.value === '' || inputamount.value === '') {
        errorMessage()
    }

    fetch(url).then(
        function (response) {
            console.log(response);
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            }
            else {
                throw 'Cant connect to server';
            }
        }
    ).then(
        function (data) {
            for (let i = 0; i < inputamount.value; i++) {
               let url = getImageUrl(data.photos.photo[i]);

                imgDivPar = document.createElement('div');
                innerCaro.appendChild(imgDivPar);
                imgDivChild = document.createElement('img');
                imgDivPar.appendChild(imgDivChild);

                imgDivChild.src = url;

                if(i === 0){
                    imgDivPar.classList.add('carousel-item', 'active');
                    imgDivChild.classList.add('d-block', 'w-100');
                }
                else{
                    imgDivPar.classList.add('carousel-item');
                    imgDivChild.classList.add('d-block', 'w-100');
                }
                console.log(data);
            }
            loopLoad.style.display = 'none'; 
        }
    ).catch(
        function (error) {
            console.log(error);
        }
    );
    const divEl = document.querySelectorAll('.carousel-inner *')
    for (let i = 0; i < divEl.length; i++) {
        let el = divEl[i];
        el.remove();
        
    }
})

function getImageUrl(photoObject) {
    let photo = photoObject;
    let size = inputsize.value;

    if (size === 'b') {
        size = 'b';
        document.querySelector("#carouselExampleFade").style.width= "1024px";
        
    }
    else if (size === 'z') {
        size = 'z';
        document.querySelector("#carouselExampleFade").style.width= "640px";
    }
    else if (size === 'm') {
        size = 'm';
        document.querySelector("#carouselExampleFade").style.width= "240px";
    }

    let imgUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${size}.jpg`;
    return imgUrl;
    
}

function loadingLoop(){
    loopLoad.style.display = 'block';
    anime({
        targets: '#loading',
        width: '100%',
        direction: 'alternate',
        left: '240px',
        borderRadius: ['0%', '50%'],
        easing: 'easeInOutQuad',
        loop: true
        
      });
}