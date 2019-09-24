const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit' , e => {
    e.preventDefault();
    const location = search.value    
    messageOne.textContent = 'Please wait a secend...'
    messageTwo.textContent = ''
    if(location){
        fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
            response.json().then((data) => {
              
                if(!data.error) {
                    messageOne.textContent = data.Location
                    messageTwo.textContent = data.Response
                } else {
                    messageOne.textContent = 'Unknown location. Please enter another location.'
                    messageTwo.textContent = ''
                }
                weatherForm.reset()
            })
        })
    }else{
        messageOne.textContent = 'You must enter a location.'
        messageTwo.textContent = ''
        weatherForm.reset()
    }
})

