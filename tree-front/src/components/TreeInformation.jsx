import './table-info.css'
const TreeInformation = ({treeData})=>{

    if(treeData.length == 0 || treeData == null ){
        return (<></>)
    }
    return(
        <table>
          <thead>
          <tr>
              <td>C&oacute;digo arbol</td>
              <td>Especie</td>
              <td>Ubicaci&oacute;n</td>
              <td>Qui&eacute;n plant&oacute;</td>
            </tr>
          </thead>
          <tbody>
            {treeData.map((x, index)=>{
                return (
                <tr id={index}>                      
                  <td> {x.data['tree-code']}</td>
                  <td> {x.data['tree-species']}</td>
                  <td> {x.data['latitude'] } / {x.data['longitude']}</td>
                  <td> {x.data['tree-planter']}</td>
                </tr>                            
              )}) 
            }
          </tbody>
        </table>
    )

}

export default TreeInformation;