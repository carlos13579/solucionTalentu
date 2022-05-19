const contenido = document.querySelector("#contenido");
const add = document.querySelector("#add");
const openButton = document.querySelector("#open");
const closeButton = document.querySelector("#close");
/*validamos si existe la variable local, si no existe llamamos la funcion traer para hacer get al servicio y almacenar
los datos en la variable local*/
if (localStorage.getItem("data") === null) {
  traer();
} else {
  let data = localStorage.getItem("data");//almacenamos la variable local en la variable data
  data = JSON.parse(data);//converitimos el string almacenado a un objeto JSON
  tabla(data);//llamamos la funcion tabla y le pasamos la variable data que contiene el objeto con los usuarios almacenados
}
function traer() {
  /*usamos el metodo fetch para hacer la peticion al servicio y traer los datos*/ 
  fetch("https://reqres.in/api/users?page=1")
    .then((res) => res.json())//usamos el metodo .JSON() para extraer el contenido obtenido de la respuesta
    .then((data) => {
      localStorage.setItem("data", JSON.stringify(data.data));//usamos el metodo JSON.stringify() para convertir el objeto obtenido en una cadena de texto JSON y posteriormente almacenar en la variable global
      let dat = localStorage.getItem("data");//almacenamos la variable local en la variable dat
      dat = JSON.parse(dat);//converitimos el string almacenado a un objeto JSON
      tabla(dat);//llamamos la funcion tabla y le pasamos la variable data que contiene el objeto con los usuarios almacenados 
    });
}
function tabla(datos) {
    let currenTime= new Date();
    let anio = currenTime.getFullYear();//declaramos la variable anio para obtener el año actual, la usaremos para calcular la edad de los usuarios
    let edad;
    /*realizamos el for para cada uno de los usuarios almacenados en datos, posteriormente para agregar a la tabla  */
  for (let val of datos) {
    /* validamos si el elemento age existe, si no, edad pasa a ser sin registro, si existe calculamos la edad del usuario */
      if(val.age===undefined){
          edad="sin registro";
      }else{
          let anioData=(val.age).split("-");//creamos la variable anioData para almacenar el año de la fecha de nacimiento que el usuario ingreso en el formulario
          edad=anio-anioData[0];//la variable edad pasa a ser la resta del año actual de la variable anio, menos anioData que contiene el año de nacimiento del usuario
          edad=edad+" años";
      }
      //usamos la propiedad innerHTML para agregar a la tabla los usuarios obtenidos 
    contenido.innerHTML +=
      "<tr>" +
      '<th scope="row">' +val.id +"</th>" +
      "<td>" +val.first_name +" " +val.last_name +"</td>" +
      "<td>"+edad+"</td>" +
      "<td>" +val.email +"</td>" +
      "</tr>";
  }
}
//agregamos al boton add el evento click para proceder a ingresar un nuevo usuario
add.addEventListener('click', ()=>{
    let v=0;
    let err="";
    //en la variable array almacenamos los datos ingresados por el usuario
    let array =[
                  document.querySelector("#email").value,
                  document.querySelector("#nombre").value,
                  document.querySelector("#apellido").value,
                  document.querySelector("#edad").value
               ];
               //realizamos un for para validar que los datos no estan vacios, y en el campo de email, validar que contenga el @ para que sea una direccion de correo valida
    for(let i=0;i<4;i++){
        if(array[i]===""){
            v++;
            err+= "El campo "+(i+1)+" esta vacio, \n";
        }
        if(i==0){
            if(array[0].includes("@")){}else{ v++; err+= "Debe ingresar una direccion de correo valida\n"; }
        }
    }
    //validamos si la variable v es igual a 0, procedemos a ingresar el nuevo usuario en la variable local
 if(v==0){
   let data = localStorage.getItem("data");
  data = JSON.parse(data);
  //creamos el objeto newUser que almacenara los datos ingresados por el usuario
    let newUser = {
        id: (data.length)+1,
        email: array[0],
        first_name: array[1], 
        last_name: array[2], 
        age: array[3]
    }
    //realizamos un push al arreglo data que contiene los usuarios 
  data.push(newUser);
  //limpiamos los usuarios de la tabla
  contenido.innerHTML='';
  //almacenamos los usuarios ya con el nuevo usuario cargado
  localStorage.setItem("data", JSON.stringify(data));
  //lammamos la funcion tabla para agregar los usuarios a la tabla
  tabla(data);
  //asignamos vacio a los campos del formulario
                  document.querySelector("#email").value="";
                  document.querySelector("#nombre").value="";
                  document.querySelector("#apellido").value="";
                  document.querySelector("#edad").value="";
    //aparece una confirmacion de que se agrego correctamente el usuario
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Usuario registrado correctamente!',
        showConfirmButton: false,
        timer: 1500
      })
 }
 //si la variable v es diferente de 0 aparece un mensaje de error y no se ingresa el nuevo usuario
 else{
    Swal.fire({
        icon: 'error',
        title: 'Error...',
        text: err
      })
     console.log(err);
 }
    
})
//agregamos el evento click al boton open, para que el formulario aparezca en pantalla, solo si el tamaño de la pantalla es menor al del @media del css
openButton.addEventListener('click', ()=>{
  let formBox = document.querySelector("#formBox");
  formBox.classList.add('show');
})
//agregamos el evento click al boton close, para cerra el formulario 
closeButton.addEventListener('click', ()=>{
  let formBox = document.querySelector("#formBox");
  formBox.classList.remove('show');
})
