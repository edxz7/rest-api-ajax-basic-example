window.onload = async () => {
    // crear el servicio con axios
    const countriesService = axios.create({
        baseURL: 'http://localhost:5005/api'
    })

    let { data: { countries }} = await countriesService.get('/countries');
    // console.log('countries: ', countries);

    /**
     * READ
     */
        // Nos traemos el contenedor que desplegara a la lista de paises
        const list = document.getElementById('countries-list');
        async function updateData() {
          list.innerHTML="";
          let update = await countriesService.get("/countries"); // esto me trae un aray de paises
          countries = update.data.countries;          
          countries.forEach(country => {
            // por cada pais creamos un tag article y un anchor que nos lleven al detalle de cada pais
            const article = document.createElement("article");
            const anchorCountryName = document.createElement("anchor"); // country names
            const spanId = document.createElement("span"); // id
            const spanConfirmedCases = document.createElement("span"); // confirmed cases
            const spanTrashCan = document.createElement("span"); // X para borrar el registro
      
            // anchorCountryName.setAttribute('href', `/${country._id}`);
      
            // agregamos la info de cada pais
            anchorCountryName.innerText = country.name;
            spanId.innerText = country._id;
            spanConfirmedCases.innerText = country.confirmed;
            spanTrashCan.innerText = "X";
            spanTrashCan.className = `btn btn-danger mx-xl delete ${country._id}`;
            //                                               |
            //                       usaremos esta clase delete, para borrar
            article.appendChild(anchorCountryName);
            article.appendChild(spanId);
            article.appendChild(spanConfirmedCases);
            article.appendChild(spanTrashCan);
            article.style = "display: flex; justify-content: space-around;"
      
            // agregamos el article a la vista
            list.appendChild(article);
      
            console.log("Phase1 ", document.querySelectorAll(".delete"));
          });
        }

        await updateData();



    /**
     * Create
     */

    console.log("Phase2 ", document.querySelectorAll(".delete"));
    // Create Records
    document.querySelector("#create-form").onsubmit = (event) => {
      event.preventDefault();
      // tomamos los valores de los inputs
      const name = document.querySelector("#namecreate").value;
      const confirmed = document.querySelector("#confirmedcreate").value;
      const recovered = document.querySelector("#recoveredcreate").value
      const deaths = document.querySelector("#deathscreate").value;
      countriesService
      .post('/countries', { name, confirmed, recovered, deaths })
      .then(res => {
        console.log(res);
        updateData();
      })
      .catch(err => console.log(err));
    }
    /**
     * Update
     */
  
    document.querySelector("#update-form").onsubmit = (event) => {
        event.preventDefault();
        const name = document.querySelector("#nameupdate").value;
        const confirmed = document.querySelector("#confirmedupdate").value;
        const recovered = document.querySelector("#recoveredupdate").value
        const deaths = document.querySelector("#deathsupdate").value;
        countriesService
        .patch(`/countries/${id}`, { name, confirmed, recovered, deaths })
        .then(res => {
          console.log(res);
          updateData();
        });
      }
    
      /**
       * Delete
       */
      const closeTags = document.querySelectorAll(".delete");
      console.log("Existen? ", closeTags);
      if(closeTags) {
        list.onclick = async (e) => {
          console.log(e.target);
          let id = e.target.classList[e.target.classList.length - 1];
          await countriesService.delete(`/countries/${id}`);
          updateData();
        }
      }

}