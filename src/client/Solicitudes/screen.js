import React, { useEffect, useState } from "react";
import {
  Container,
  VBox,
  BannerHeader,
  BasicSegment,
} from "@ombiel/aek-lib";
import RegisterPost from "../../components/registerPost";
import 
{
  
}from "@ombiel/aek-css";
import "../../client/Solicitudes.css";
import { request } from "@ombiel/aek-lib";
<link rel="stylesheet" href="../../client/Solicitudes.css" />



export default screen = () => {

  const [lista, setLista] = useState([]);
  const [estado, setEstado] = useState("");
  const [tiempo_final, setFechafin] = useState("tiempo");
  const [exist,setReten] = useState("");
  const [idUser, setidUser] = useState("");
  const stgris = {
    backgroundColor: '#F2F2F2',
    fontFamily: 'Helvetica',
    fontSize: '12px'
  };
  const stverde ={
    backgroundColor: '#151b60',
    fontFamily: 'Helvetica',
    fontSize: '12px'
  };
  const stalerta ={
    backgroundColor: '#779B00',
    fontFamily: 'Helvetica',
    fontSize: '12px',
    color: '#ffffff'
  };
  // var estado = "FASLG"
  //000164011
  //52735954

  //000896511
  useEffect(() => {
    request.action("get-user").end((err, response) => {
      console.log(response.body);
      const { idUniminuto } = response.body.extraAttrs;
      setidUser(idUniminuto);
      console.log("@@@ID", { idUniminuto }, { idUser })
      console.log(err);
    })//setidUser("000746978");
  }, [])


  const llenarLista = async () => {
  

            const myHeaders = new Headers();
            myHeaders.append("apikey", "ITnjVcrLWfYpY2B246EcrWO6Hln3LD7a");
            console.log("estoy aqui");
            console.log(idUser);
            const requestOptions = {
              method: "GET",
              headers: myHeaders,
              redirect: "follow"
              };

              const url = `https://uniminuto.api.digibee.io/pipeline/uniminuto/v1/servicios-banner/solicitudAcademica?id=${idUser}`;
  const response = await fetch(`https://uniminuto.api.digibee.io/pipeline/uniminuto/v1/servicios-banner/solicitudAcademica?id=${idUser}`, requestOptions);
 console.log(url); 
    const movies = await response.json();
    // console.log(movies.body);
    const objeto = movies.body;
    console.log(objeto.solicitudes);
    if (Array.isArray(objeto.solicitudes) && objeto.solicitudes.length > 0){
    setReten("Con");
    }
    else
    {
      setReten("Sin");
    }
    setLista([...objeto.solicitudes]);
    
    
  }


  useEffect(() => {
    if (idUser) {
      llenarLista();
    }
  }, [idUser])



if (exist=="Sin")
{
  return (
    <><link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet" /><div className="container mx-auto px-4 py-10 bg-gray p-4" style={stgris}>
    
          
        
          
          <ul className="flex flex-col space-y-4 bg-white rounded-md shadow-md p-4 ">
          <div className="container mx-auto text-white flex justify-center p-2 ">
                  <span className="flex items-center justify-center  rounded-md p-1 text-center" style={stverde}>No hay Solicitudes Academicas. </span>
                  
                </div> 
          

          </ul>

       </div></>
  )
} else if(exist=="Con")
{
    return (
      <><link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet" /><div className="container mx-auto px-4 py-10 bg-gray p-4">
    
    
          
          
          
          <ul className="flex flex-col space-y-4 bg-white rounded-md shadow-md p-4">
          <div className="container mx-auto text-white flex p-2">
                  <span className="flex items-center justify-center  rounded-md p-1 text-center" style={stalerta}>La información que se visualiza a continuación no es considerada una certificación de UNIMINUTO, puede estar sujeta a ajustes y/o modificaciones. </span>
                  
                </div> 
                {lista.map((item) => (
  <div key={item.SEQ_NO} className="container mx-auto bg-blue-30 border border-gray-500 mb-4">
    <div className="container mx-auto bg-blue-30">
      <div className="flex p-2">
        <div className="w-1/4 p-1 text-white font-bold" style={stverde}>Fecha:</div>
        <div className="w-3/4 p-1 text-black">{item.FECHA}</div>
      </div>
      <div className="flex p-2">
        <div className="w-1/4 p-1 text-white font-bold" style={stverde}>Periodo:</div>
        <div className="w-3/4 p-1 text-black">{item.PERIODO}</div>
      </div>
      <div className="flex p-2">
        <div className="w-1/4 p-1 text-white font-bold" style={stverde}>Tipo de solicitud:</div>
        <div className="w-3/4 p-1 text-black">{item.DESC_SERVICIO}</div>
      </div>
      <div className="flex p-2">
        <div className="w-1/4 p-1 text-white font-bold" style={stverde}>Respuesta:</div>
        <div className="w-3/4 p-1 text-black">{item.SRVS_DESC}</div>
      </div>
      <div className="flex p-2">
        <div className="w-1/4 p-1 text-white font-bold" style={stverde}>Comentario:</div>
        <div className="w-3/4 p-1 text-black">{item.RTA_COMMENT}</div>
      </div>
    </div>
  </div>
))}

          </ul>
          

        
    </div></>
  )
}
else
{
  return (
    <Container>
      <VBox>
        <BasicSegment>

        
        </BasicSegment>
      </VBox>
    </Container>
  )
}
}
