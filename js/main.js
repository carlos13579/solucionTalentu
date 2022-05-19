const contenido = document.querySelector("#contenido");
const add = document.querySelector("#add");
const openButton = document.querySelector("#open");
const closeButton = document.querySelector("#close");
if (localStorage.getItem("data") === null) {
  traer();
} else {
  let data = localStorage.getItem("data");
  data = JSON.parse(data);
  tabla(data);
}
function traer() {
  fetch("https://reqres.in/api/users?page=1")
    .then((res) => res.json())
    .then((data) => {
      localStorage.setItem("data", JSON.stringify(data.data));
      let dat = localStorage.getItem("data");
      dat = JSON.parse(dat);
      tabla(dat);
    });
}
function tabla(datos) {
    let currenTime= new Date();
    let anio = currenTime.getFullYear();
    let edad;
  for (let val of datos) {
      if(val.age===undefined){
          edad="sin registro";
      }else{
          let anioData=(val.age).split("-");
          edad=anio-anioData[0];
      }
    contenido.innerHTML +=
      "<tr>" +
      '<th scope="row">' +val.id +"</th>" +
      "<td>" +val.first_name +" " +val.last_name +"</td>" +
      "<td>"+edad+" años</td>" +
      "<td>" +val.email +"</td>" +
      "</tr>";
  }
}

add.addEventListener('click', ()=>{
    let v=0;
    let err="";
    let array =[
                  document.querySelector("#email").value,
                  document.querySelector("#nombre").value,
                  document.querySelector("#apellido").value,
                  document.querySelector("#edad").value
               ];
    for(let i=0;i<4;i++){
        if(array[i]===""){
            v++;
            err+= "El campo "+(i+1)+" esta vacio, \n";
        }
        if(i==0){
            if(array[0].includes("@")){}else{ v++; err+= "Debe ingresar una direccion de correo valida\n"; }
        }
    }
 if(v==0){
   let data = localStorage.getItem("data");
  data = JSON.parse(data);
    let newUser = {
        id: (data.length)+1,
        email: array[0],
        first_name: array[1], 
        last_name: array[2], 
        age: array[3]
    }
  data.push(newUser);
  contenido.innerHTML='';
  localStorage.setItem("data", JSON.stringify(data));
  tabla(data);
                  document.querySelector("#email").value="";
                  document.querySelector("#nombre").value="";
                  document.querySelector("#apellido").value="";
                  document.querySelector("#edad").value="";
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Usuario registrado correctamente!',
        showConfirmButton: false,
        timer: 1500
      })
 }else{
    Swal.fire({
        icon: 'error',
        title: 'Error...',
        text: err
      })
     console.log(err);
 }
    
})

openButton.addEventListener('click', ()=>{
  let formBox = document.querySelector("#formBox");
  formBox.classList.add('show');
})
closeButton.addEventListener('click', ()=>{
  let formBox = document.querySelector("#formBox");
  formBox.classList.remove('show');
})