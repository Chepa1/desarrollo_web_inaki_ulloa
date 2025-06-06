//grafico 1
async function cargarGraficoActividadesPorDia() {
    try {
        const response = await fetch("/api/estadisticas/actividades-por-dia")
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`)
        }

        const data = await response.json()

        Highcharts.chart("chart1", {
            chart: {
                type: "line"
            },
            title: {
                text: "Cantidad de actividades por día"
            },
            xAxis: {
                categories: data.fechas,
                title: {
                    text: "Días"
                }
            },
            yAxis: {
                title: {
                    text: "Cantidad de actividades"
                },
                min: 0,
                allowDecimals: false
            },
            series: [
                {
                name: "Actividades",
                data: data.cantidades,
                color: "#007bff"
                }
            ],
            legend: {
                enabled: false
            }
        })
    }
    
    catch (error) {
        console.error("Error al cargar gráfico de actividades por día:", error)
        document.getElementById("chart1").innerHTML = '<div class="loading">Error al cargar el gráfico</div>'
    }
}

async function cargarGraficoActividadesPorTipo() {
    try {
        const response = await fetch("/api/estadisticas/actividades-por-tipo")
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`)
        }

        const data = await response.json()
        const seriesData = data.tipos.map((tipo, index) => ({
            name: tipo,
            y: data.cantidades[index],
        }))

        Highcharts.chart("chart2", {
            chart: {
                type: "pie"
            },
            title: {
                text: "Total de actividades por tipo"
            },
            series: [
                {
                    name: "Actividades",
                    data: seriesData,
                    colorByPoint: true
                }
            ],
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: "pointer",
                    dataLabels: {
                        enabled: true,
                        format: "<b>{point.name}</b>: {point.percentage:.1f} %"
                    }
                },
            }
        })
    }
    catch (error) {
        console.error("Error al cargar gráfico de actividades por tipo:", error)
        document.getElementById("chart2").innerHTML = '<div class="loading">Error al cargar el gráfico</div>'
    }
}

document.addEventListener("DOMContentLoaded", () => {
    cargarGraficoActividadesPorDia()
    cargarGraficoActividadesPorTipo()
})