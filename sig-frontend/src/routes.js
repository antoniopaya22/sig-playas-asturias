import Inicio from "./views/inicio/Inicio.jsx";
import Historial from "./views/historial/Historial.jsx";

const dashRoutes = [{
        path: "/inicio",
        name: "Inicio",
        icon: "design_app",
        component: Inicio,
        layout: "/playas",
    },
    {
        path: "/historial",
        name: "Historial",
        icon: "location_map-big",
        component: Historial,
        layout: "/playas",
    },
];
export default dashRoutes;