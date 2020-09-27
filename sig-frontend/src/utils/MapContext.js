import { createContext } from 'react';
import { actions } from '../constants';

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
            datasets: [{
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
            }, ],
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
            yAxes: [{
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
            }, ],
            xAxes: [{
                gridLines: {
                    display: false,
                    color: "rgba(255,255,255,0.1)",
                },
                ticks: {
                    padding: 10,
                    fontColor: "rgba(255,255,255,0.4)",
                    fontStyle: "bold",
                },
            }, ],
        },
    },
};

export const initialState = {
    map: null,
    origen: null,
    ruta: null,
    playas: [],
    marcadores: [],
    seleccionada: null,
    showModal: {
        show: false,
        cabecera: '',
        mensaje: ''
    },
    tiempo: '',
    error: false,
    grafica: dashboardPanelChart
};

export const MapContext = createContext();

export const mapReducer = (state, action) => {
    switch (action.type) {
        case actions.ACTUALIZAR_RUTA:
            return {...state, ruta: action.data };

        case actions.ACTUALIZAR_PLAYAS:
            return {...state, playas: action.data };

        case actions.ACTUALIZAR_GRAFICA:
            return {...state, grafica: updateGrafica(action.data) };

        case actions.ACTUALIZAR_MARCADOR_PLAYA:
            return {...state, marcadores: [...state.marcadores, { playaId: action.data.playaId, marcador: action.data.marcador }] }

        case actions.SELECCIONAR_PLAYA:
            return {...state, seleccionada: action.data };

        case actions.SET_MAP:
            return {...state, map: action.data };

        case actions.SET_ORIGEN:
            return {...state, origen: action.data }

        case actions.SHOW_MODAL:
            return {...state, showModal: action.data }

        case actions.ACTUALIZAR_TIEMPO:
            return {...state, tiempo: action.data }

        default:
            return initialState;
    }
}

function updateGrafica(data) {
    return {
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
                labels: data.labels,
                datasets: [{
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
                    data: data.data,
                }, ],
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
                yAxes: [{
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
                }, ],
                xAxes: [{
                    gridLines: {
                        display: false,
                        color: "rgba(255,255,255,0.1)",
                    },
                    ticks: {
                        padding: 10,
                        fontColor: "rgba(255,255,255,0.4)",
                        fontStyle: "bold",
                    },
                }, ],
            },
        },
    };
}