const { default: axios } = require("axios");

const busStop = '18141';
const api = `https://arrivelah2.busrouter.sg/?id=${busStop}`;

async function loadBusData() {
    console.log("START");
    // //Before
    // axios.get(api).then(response => {
    //     let bus14 = response.data.services[0];
    //     console.log("Bus 14 next timing");
    //     console.log(bus14.next.time);
    //     console.log(`That bus is ${bus14.next.duration_ms / 60000} minutes away`)
    // });
    
    //After (async await)
    const response = await axios.get(api)
    let bus14 = response.data.services[0];
    console.log("Bus 14 next timing");
    console.log(bus14.next.time);
    console.log(`That bus is ${bus14.next.duration_ms / 60000} minutes away`)
    
    console.log("END");
};

loadBusData()
