import React, { useContext } from 'react';
import { MapContext } from '../../utils/MapContext';
import { actions, mensajes } from '../../constants';
import { getPlayas, searchOcupations } from '../../api/inicioApi';
import { Row, Col, Card, CardHeader, CardBody, CardImg, Button } from 'reactstrap';
import { Line } from "react-chartjs-2";
import PanelHeader from "../../components/PanelHeader";

export default function Playas() {
    const { state, dispatch } = useContext(MapContext);
    const dashboardPanelChart = {
        data: (canvas) => {
          const ctx = canvas.getContext("2d");
          var chartColor = "#FFFFFF";
          var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
          gradientStroke.addColorStop(0, "#80b6f4");
          gradientStroke.addColorStop(1, chartColor);
          var gradientFill = ctx.createLinearGradient(0, 200, 0, 50);
          gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
          gradientFill.addColorStop(1, "rgba(255, 255, 255, 0.14)");
      
          return {
            labels: [
              "JAN",
              "FEB",
              "MAR",
              "APR",
              "MAY",
              "JUN",
              "JUL",
              "AUG",
              "SEP",
              "OCT",
              "NOV",
              "DEC",
            ],
            datasets: [
              {
                label: "Data",
                borderColor: chartColor,
                pointBorderColor: chartColor,
                pointBackgroundColor: "#2c2c2c",
                pointHoverBackgroundColor: "#2c2c2c",
                pointHoverBorderColor: chartColor,
                pointBorderWidth: 1,
                pointHoverRadius: 7,
                pointHoverBorderWidth: 2,
                pointRadius: 5,
                fill: true,
                backgroundColor: gradientFill,
                borderWidth: 2,
                data: [50, 150, 100, 190, 130, 90, 150, 160, 120, 140, 190, 95],
              },
            ],
          };
        },
        options: {
          layout: {
            padding: {
              left: 20,
              right: 20,
              top: 0,
              bottom: 0,
            },
          },
          maintainAspectRatio: false,
          tooltips: {
            backgroundColor: "#fff",
            titleFontColor: "#333",
            bodyFontColor: "#666",
            bodySpacing: 4,
            xPadding: 12,
            mode: "nearest",
            intersect: 0,
            position: "nearest",
          },
          legend: {
            position: "bottom",
            fillStyle: "#FFF",
            display: false,
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  fontColor: "rgba(255,255,255,0.4)",
                  fontStyle: "bold",
                  beginAtZero: true,
                  maxTicksLimit: 5,
                  padding: 10,
                },
                gridLines: {
                  drawTicks: true,
                  drawBorder: false,
                  display: true,
                  color: "rgba(255,255,255,0.1)",
                  zeroLineColor: "transparent",
                },
              },
            ],
            xAxes: [
              {
                gridLines: {
                  display: false,
                  color: "rgba(255,255,255,0.1)",
                },
                ticks: {
                  padding: 10,
                  fontColor: "rgba(255,255,255,0.4)",
                  fontStyle: "bold",
                },
              },
            ],
          },
        },
      };
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

    const obtenerHistorial = (playa_id) => {
        searchOcupations(playa_id).then(result => {
            console.log(result);
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

    obtenerPlayas();
    return(
        <>
        <PanelHeader size="lm" content={
            <Line
              data={dashboardPanelChart.data}
              options={dashboardPanelChart.options}
            />
          }
        />
        <div className="content">
            <Row>
                {
                    state.playas.filter(x => x.ocupacion_actual !== -1).map((p) => { 
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