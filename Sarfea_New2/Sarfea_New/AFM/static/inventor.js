


getAndRenderList();

async function getAndRenderList(){
    try{
        const response = await fetch('/get_operation_care/');
        
        const data = await response.json();
        const cards = data.operation_care;
        console.log(response)
        console.log(data)
        console.log(cards)

       
    }catch(event){
        console.log(event)
    }
}