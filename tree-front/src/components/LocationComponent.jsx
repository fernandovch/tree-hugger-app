import React, { useState, useEffect } from 'react';
import TreeInformation from './TreeInformation';

const LocationComponent = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [treesCollection, setTreesCollection] = useState([])
  const [formData, setFormData] = useState(
    {
      latitude:  null,
      longitude:  null,
      'tree-code':  ''    ,
      'tree-planter':  '',
      'tree-species':  ''      
    }
  );
  
  const callPostData =()=>{
    // For example, using fetch:
    setFormData(
      {
        ...formData,
          latitude:  location.latitude,
          longitude:  location.longitude,          
      }
    )

    fetch('http://localhost:3000/trees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Location saved successfully:', data);
        callGetTrees()
      })
      .catch(error => {
        console.error('Error saving location:', error);
      });
  }

  const callGetTrees =()=>{
    // For example, using fetch:
    
    fetch('http://localhost:3000/trees', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },      
    })
      .then(response => response.json())
      .then(data => {
        console.log('DATA:', data);
        setTreesCollection(data)
      })
      .catch(error => {
        console.error('Error saving location:', error);
      });
  }

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error Code = " + error.code + " - " + error.message);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getLocation()

  }, []);

  useEffect(() => {    
     callGetTrees()

  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (<>
      <div>
        <form action="submit" onSubmit={callPostData}>
        <table>        
          <thead>
            <tr>
              <td colSpan="2" >
              <h1>
                Registro de arboles
                </h1>
              </td>           
            </tr>
          </thead>
          <tbody>      
          <tr>
            <td>
              <label>
                Latitud: {location.latitude} 
              </label>
            </td>
            <td> 
              <label>
                Longitud: {location.longitude}
              </label>
              </td>
          </tr>
          <tr>
            <td><label>C&oacute;digo de arbol</label></td>
            <td><input type="text" name="tree-code" id="tree-code" value={formData['tree-code']} onChange={handleInputChange} required={true} /></td>
          </tr>
          <tr>
            <td><label>Colaborador</label></td>
            <td><input type="text" name="tree-planter" id="tree-planter" value={formData['tree-planter']} onChange={handleInputChange} required={true} /></td>
          </tr>
          <tr>
            <td><label>Especie</label></td>
            <td><input type="text" name="tree-species" id="tree-species" value={formData['tree-species']} onChange={handleInputChange} required={true}/></td>
          </tr>
          <tr>
            <td><button type='submit'>Guardar informaci&oacute;n</button></td>
            <td><button onClick={getLocation}>Refrescar ubicaci&oacute;n</button></td>
          </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>
               
              </td>
            </tr>
          </tfoot>
        </table>   
        </form>       
      </div>
      <div>
        <TreeInformation treeData={treesCollection}></TreeInformation>
      </div>
    </>
  );
};

export default LocationComponent;