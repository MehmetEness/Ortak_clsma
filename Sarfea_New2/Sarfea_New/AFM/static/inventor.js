


getAndRenderList();

async function getAndRenderList(){
    try{
        const response = await fetch('/get_clients/');
        console.log(response)
        const data = await response.json();
        const cards = data.cards;
        console.log(response)
        console.log(data)
        console.log(cards)

       
    }catch(event){
        console.log(event)
    }
}