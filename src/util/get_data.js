const get_data = async () => {
    return fetch("http://staccah.fattureincloud.it/testfrontend/data.json")
    .then(res => res.json())
    .then(({mesi}) => mesi)
}

export default get_data;