import React, { useContext, useEffect } from'react';
import { MapContext } from '../../utils/MapContext';
import { actions, mensajes } from '../../constants';
import { getPlayas, searchOcupations } from '../../api/inicioApi';
import { Row, Col, Card, CardHeader, CardBody, CardImg, Button } from 'reactstrap';
import { Line } from "react-chartjs-2";
import PanelHeader from "../../components/PanelHeader";

export default function Playas() {
    const { state, dispatch } = useContext(MapContext);
    
    const obtenerPlayas = () => {
        getPlayas()
        .then(result => {
            dispatch({
                type: actions.ACTUALIZAR_PLAYAS,
                data: result
            });
        })
        .catch(_ => {
            dispatch({
                type: actions.SHOW_MODAL,
                data: {
                    show: true,
                    cabecera: mensajes.errorHeader,
                    mensaje: mensajes.errorBody
                }
            })
        });
    }   

    const obtenerDatosGrafica = (datos) =>{
      let tags = []
      let values = []
      for(var i = 0; i < datos.length; i++){
        let date = datos[i].timestamp.split(' ')[0].split('/')
        tags.push(date[0]+'/'+date[1])
        values.push(datos[i].ocupacion)
      }
      let mean = 0
      let current = undefined
      let num = 1
      let newtags = []
      let newvalues = []
      for(var i = 0; i < tags.length; i++){
        if(i == 0){
          current = tags[i]
          newtags.push(tags[i])
          mean += values[i]
        }
        else if(current != tags[i] && i != 0 && i !=  tags.length -1) {
          newvalues.push(mean/num)
          current = tags[i]
          newtags.push(tags[i])
          num = 1
          mean = 0
          mean += values[i]
        }else if( current == tags[i] && i ==  tags.length -1){
          num++
          mean += values[i]
          console.log(num)
          newvalues.push(mean/num)
        }else if( current != tags[i] && i ==  tags.length -1){
          newvalues.push(mean/num)
          mean = values[i]
          newtags.push(tags[i])
          newvalues.push(mean)
        }
        else if(current == tags[i]){
          mean += values[i]
          num++
        }
      }
      let data = {
        'labels': newtags,
        'data': newvalues
      }
      return data
    }

    const obtenerHistorial = (playa_id) => {
        searchOcupations(playa_id).then(result => {
            dispatch({
                type: actions.ACTUALIZAR_GRAFICA,
                data: obtenerDatosGrafica(result)
            })
            window.scrollTo({top: 0, behavior: 'smooth'});
        }).catch(_ => {
            dispatch({
                type: actions.SHOW_MODAL,
                data: {
                    show: true,
                    cabecera: mensajes.errorHeader,
                    mensaje: mensajes.errorBody
                }
            })
        });
    }

    useEffect(()=>{
      obtenerPlayas();
    }, [])

    return(
        <>
        <PanelHeader size="lm" content={
            <Line
              data={state.grafica.data}
              options={state.grafica.options}
            />
          }
        />
        <div className="content">
            <Row>
                {
                    state.playas.filter(x => x.playa_id !== null && x.playa_id !== "").map((p) => { 
                        return  <Col xs={2}>
                            <Card>
                                <CardImg src={p.foto_tiempo_real || p.foto_estatica} height={"130px"}></CardImg>
                                <CardHeader>{p.nombre}</CardHeader>
                                <CardBody>
                                    <Button onClick={() => obtenerHistorial(p.playa_id)}>Ver gráfica</Button>
                                </CardBody>
                            </Card> 
                        </Col>
                    })
                }
                
            </Row>
        </div>
        </>
    );
}