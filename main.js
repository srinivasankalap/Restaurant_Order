let form = document.getElementById('form');
form.addEventListener('submit',store);
let itemList1=document.getElementById('items_table1');
let itemList2=document.getElementById('items_table2');
let itemList3=document.getElementById('items_table3');

itemList1.addEventListener('click', function (e) {
    if (e.target.classList.contains('delete')) {
        removeExpense(e.target, 'table1');
    }
});
itemList2.addEventListener('click', function (e) {
    if (e.target.classList.contains('delete')) {
        removeExpense(e.target, 'table2');
    }
});
itemList3.addEventListener('click', function (e) {
    if (e.target.classList.contains('delete')) {
        removeExpense(e.target, 'table3');
    }
});


function store(e){
    e.preventDefault();
    let describe=document.getElementById('floatingInputValue').value;
    let category=document.getElementById('choose').value;
    let amount=document.getElementById('amount').value;
    let myObj={
        Category:category,
        Description:describe,
        Amount:amount,
    }
    axios.post("https://crudcrud.com/api/173bd42e51854b0da64025da8a55f992/orders",myObj)
    .then((response)=>{
        addItem(response.data);
    })
    .catch((err)=>{
        console.log(err);
    })
}

function addItem(item){
    let li=document.createElement('li');
    li.className='item';
    li.appendChild(document.createTextNode('₹ '+item.Amount+' '+item.Category+' '+item.Description+' '));
    let deleteBtn=document.createElement('button');
    deleteBtn.className='delete';
    deleteBtn.appendChild(document.createTextNode('Delete Expense'));
    li.appendChild(deleteBtn);
    if (item.Category=='table1'){
        itemList1.appendChild(li);
    }else if(item.Category=='table2'){
        itemList2.appendChild(li);
    }else{
        itemList3.appendChild(li);
    }
}


function removeExpense(deleteButton,category){
        var li=deleteButton.parentElement;
        let expenseText = li.textContent;
        let temp=expenseText.split(' ');
        let describe="";
        if (temp[4]!='Delete'){
            describe=temp.slice(3,5).join(" ");
        }else{
            describe=temp.slice(3,4).join(" ");
        }
        console.log(describe);
        axios.get("https://crudcrud.com/api/173bd42e51854b0da64025da8a55f992/orders")
        .then((response)=>{
            console.log(response);
            const itemDelete=response.data.find(item => item.Description==describe)
            if (itemDelete){
                const itemId=itemDelete._id;
                axios.delete(`https://crudcrud.com/api/173bd42e51854b0da64025da8a55f992/orders/${itemId}`)
                .then(()=>{
                    if (category=='table1'){
                        itemList1.removeChild(li);
                    }else if(category=='table2'){
                        itemList2.removeChild(li);
                    }else{
                        itemList3.removeChild(li);
                    }
                })
                .catch((err)=>{
                    console.log(err);
                })
            }
        })
        .catch((err)=>console.log(err))
        

}

window.addEventListener("DOMContentLoaded",()=>{
    axios.get("https://crudcrud.com/api/173bd42e51854b0da64025da8a55f992/orders")
    .then((response)=>{
        for (var i=0;i<response.data.length;i++){
            addItem(response.data[i]);
        }
    })
    .catch((err)=>{
        console.log(err);
    })
})


