import React, {useContext, useEffect, useState } from 'react'
import "./DataModeling.css"
import { FaRegCircleUser } from "react-icons/fa6";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown } from "antd"
// import Navbar from '../Navbar/Navbar.jsx';
import { toast } from 'react-toastify';

import {
    inventory_model_datasets,
    revenue_model_datasets,
    equipment_model_datasets,
    clinical_model_datasets
} from './DatasetsInfo.jsx'


// import { StoreContext } from '../context/StoreContext.jsx';
import Table from "../../components/DataTable/Table.jsx"
import InventoryPieChart from '../../components/Charts/InventoryCharts/InventoryPieChart/InventoryPieChart.jsx';
import InventoryBarChart from '../../components/Charts/InventoryCharts/InventoryBarChart/InventoryBarChart.jsx';
import RevenuePieChart from '../../components/Charts/RevenueCharts/RevenuePieChart/RevenuePieChart.jsx';
import RevenueBarChart from '../../components/Charts/RevenueCharts/RevenueBarChart/RevenueBarChart.jsx';
import EquipmentPieChart from '../../components/Charts/EquipmentCharts/EquipmentPieChart/EquipmentPieChart.jsx';
import EquipmentBarChart from '../../components/Charts/EquipmentCharts/EquipmentBarChart/EquipmentBarChart.jsx';
import ClinicalPieChart from '../../components/Charts/ClinicalCharts/ClinicalPieChart/ClinicalPieChart.jsx';
import ClinicalBarChart from '../../components/Charts/ClinicalCharts/ClinicalBarChart/ClinicalBarChart.jsx';


const DataModeling = () => {

    const [username, setUsername] = useState("")

    useEffect(() => {
        const jwtToken = localStorage.getItem("token")

        if (jwtToken) {
            setUsername(localStorage.getItem("username"))
        }
    })

    // const inventory_model_datasets = [
    //     'Order History Data',
    //     'Order History with Demand Levels',
    //     'Product Information Data',
    //     'Inventory Levels Data',
    //     'Past Demand Information',
    //     'Stock Movement in Warehouse',
    //     'Warehouses Data',
    //     'Daily Weather Forecast',
    //     'Historical Weather Forecast'
    // ]

    // const revenue_model_datasets = ['Product Sales Data', 'Product Suppliers', 'Shipping Data', 'Manufacturing Costs Data']

    // const equipment_model_datasets = ['Sensor Data', 'Failure Data', 'Maintenance Data', 'Operational Data', 'Test Data of Equipment Failure']
    // const clinical_model_datasets = [
    //     "Medication Names and Details",
    //     "Orders and Transactions Data",
    //     "Shipping History Data",
    //     "Distribution Center Details",
    //     "Distribution Center Inventory Levels Data",
    //     "Historical Patient Data",
    //     "Regulatory and Compliance Data",
    //     "Lead Times Data"
    // ]

    // const datasetsNames = ["Order History", "Product Information", "Warehouse Information", "Past Demand", "Stock Movement", "Weather Data"]
    const [data, setData] = useState([])
    const [hideShow, setHideShow] = useState(true)
    const [inventoryData, setInventoryData] = useState(true)
    const [revenueData, setRevenueData] = useState(true)
    const [equipmentData1, setEquipmentData] = useState(true)
    const [clinicalData, setClinicalData] = useState(true)
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('tab1');
    const [activeChartTab, setActiveChartTab] = useState('');
    const [showPieChart, setShowPieChart] = useState(false);
    const [showResults, setShowResults] = useState(true)

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        setShowPieChart(false)
        setShowResults(true)
    };

    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get("http://localhost:3001/home")
            .then(result => {
                console.log(result)
                if (result.data !== "Successful") {
                    navigate("/login")
                } else {
                    navigate("/dataModeling")
                }
            })
            .catch(err => console.log(err))
    }, [])

    const handleLogout = () => {
        // alert("Do you want to Log out!!")
        axios.get("http://localhost:3001/logout")
            .then(result => {
                console.log(result.data)
                if (result.data === "Logout Successful!") {
                    toast.success(result.data)
                    navigate("/login")
                }
            })
    }

    const getInventoryDataFromMongoDB = async () => {
        await axios.get("http://localhost:3001/getInventoryData")
            .then(result => {
                const Array = result.data
                // const largeArray = Array.from({ length: 634 }, (_, i) => i);
                setData(Array)
                console.log(Array)
                setInventoryData(false)
                setRevenueData(true)
                setEquipmentData(true)
                setClinicalData(true)
                setHideShow(false)
                handleTabClick("tab1")
            }).catch(err => console.log(err))
    }

    const getRevenueDataFromMongoDB = async () => {
        await axios.get("http://localhost:3001/getRevenueData")
            .then(result => {
                const Array = result.data
                // const largeArray = Array.from({ length: 634 }, (_, i) => i);
                setData(Array)
                console.log(Array)
                setRevenueData(false)
                setHideShow(false)
                setInventoryData(true)
                setEquipmentData(true)
                setClinicalData(true)
                handleTabClick("tab1")
            }).catch(err => console.log(err))
    }

    const getEquipmentDataFromMongoDB = async () => {
        await axios.get("http://localhost:3001/getEquipmentData")
            .then(result => {
                const Array = result.data
                // const largeArray = Array.from({ length: 634 }, (_, i) => i);
                setData(Array)
                console.log(Array)
                setRevenueData(true)
                setHideShow(false)
                setInventoryData(true)
                setEquipmentData(false)
                setClinicalData(true)
                handleTabClick("tab1")
            }).catch(err => console.log(err))
    }

    const getClinicalDataFromMongoDB = async () => {
        await axios.get("http://localhost:3001/getClinicalData")
            .then(result => {
                const Array = result.data
                // const largeArray = Array.from({ length: 634 }, (_, i) => i);
                setData(Array)
                console.log(Array)
                setRevenueData(true)
                setHideShow(false)
                setInventoryData(true)
                setEquipmentData(true)
                setClinicalData(false)
                handleTabClick("tab1")
            }).catch(err => console.log(err))
    }

    const handleResultsData = () => {
        setInventoryData(true)
        setRevenueData(true)
        setHideShow(true)
        setEquipmentData(true)
        setClinicalData(true)
    }

    const handlePieChart = (tab) => {
        setActiveTab(tab)
        setShowPieChart(true)
        setShowResults(false)
    }

    const items = [
        {
            key: 1,
            label: (
                <a id='home-item' href="/home">
                    Go to Home
                </a>
            )
        },

        {
            key: 2,
            label: (
                <a id='home-item' onClick={getInventoryDataFromMongoDB}>
                    1) Inventory Forecasting with live data
                </a>
            )
        },
        {
            key: 3,
            label: (
                <a id='home-item' onClick={getRevenueDataFromMongoDB}>
                    2) Predicting Revenue Demand/Sensing
                </a>
            )
        },
        {
            key: 4,
            label: (
                <a id='home-item' onClick={getEquipmentDataFromMongoDB}>
                    3) Equipment Failure Prediction
                </a>
            )
        },
        {
            key: 5,
            label: (
                <a id='home-item' onClick={getClinicalDataFromMongoDB}>
                    4) Inventory Prediction With Clinical Data
                </a>
            )
        }
        ,
        {
            key: 6,
            label: (
                <a id='home-item' onClick={handleLogout}>
                    Logout
                </a>
            )
        }
    ]

    return (<>
        <div className='data-modeling-container'>
            <header className='website-header1'>
                <div className='container header-container'>
                    <Link to="/home" className='website-heading'>
                        <h1 >
                            HANELYTICS
                        </h1>
                    </Link>
                    <div className='drop-down'>
                        <div>
                            <Dropdown menu={{ items }} trigger={['hover']} id='items-drop-menu'>
                                <div className='icon-username'>
                                    <FaRegCircleUser className='user-icon' />
                                    <p className='username-text'>{username}</p>
                                </div>
                            </Dropdown>
                        </div>
                        <div>
                            <button onClick={() => handleLogout()}>Logout</button>
                        </div>
                    </div>
                </div>
            </header>
            <div className='container data-models-section-container'>
                <section className='workflows-section'>
                    <h1 className='use-case-heading' onClick={handleResultsData}>Data Models</h1>
                    <div className='data-model-types'>
                        <h2 className={inventoryData === true ? 'model-name' : "active"} onClick={getInventoryDataFromMongoDB}>
                            Reorder Point Quantity & Safety Stock Predictions for Inventory with & without Live-Data
                        </h2>
                        <h2 className={revenueData === true ? 'model-name' : "active"} onClick={getRevenueDataFromMongoDB}>
                            Predictive Analytics for Revenue Demand Sensing Trends
                        </h2>
                        <h2 className={equipmentData1 === true ? 'model-name' : "active"} onClick={getEquipmentDataFromMongoDB}>
                            Equipment Risk Detection and Failure Prevention With Predictive Analytics
                        </h2>
                        <h2 className={clinicalData === true ? 'model-name' : "active"} onClick={getClinicalDataFromMongoDB}>
                            Prediction of Reorder Point & Buffer Stock with Clinical Information
                        </h2>

                    </div>
                </section>
                {
                    hideShow && (
                        <div className='charts-section select-model-name empty-bg-image'>
                            <h2 className='select-text'>Select the Data Model to view the results</h2>
                        </div>
                    )
                }
                {!inventoryData && (
                    <div className='charts-section'>
                        <div className="tab-buttons">
                            <button
                                className={`tab ${activeTab === 'tab1' ? 'activeTab' : ''}`}
                                onClick={() => handleTabClick('tab1')}
                            >
                                Data Resources <span>(utilized)</span>
                            </button>
                            <button
                                className={`tab ${activeTab === 'tab2' ? 'activeTab' : ''}`}
                                onClick={() => handleTabClick('tab2')}
                            >
                                View Model Results
                            </button>
                        </div>

                        <div className="tab-content">
                            {activeTab === 'tab1' && (<>
                                <div id="tab1" className="content model-datasets-active">
                                    {inventory_model_datasets.map((eachDataset, index) => {
                                        return (
                                            <li key={index} className='model-dataset'>{eachDataset}</li>
                                        )
                                    })}
                                </div>
                                <div className="button">
                                    <button className='text-right btn btn-primary' onClick={handleResultsData}>
                                        Back
                                    </button>
                                    <button onClick={() => handleTabClick('tab2')} className='btn btn-success results'>View Model Insights</button>
                                </div>
                            </>)}
                            {activeTab === 'tab2' && (
                                <div id="tab2" className="content">
                                    <div className='charts-buttons'>
                                        <button className={`chart-tab ${activeTab === 'tab3' ? 'chart-tab-active' : ''}`} onClick={() => handlePieChart('tab3')}>
                                            Pie Chart
                                        </button>
                                        <button className={`chart-tab ${activeTab === 'tab4' ? 'chart-tab-active' : ''}`} onClick={() => handlePieChart('tab4')}>
                                            Bar Chart
                                        </button>
                                    </div>
                                    {showResults && 
                                        <><h1 className='results-heading'>Results:</h1>
                                    <div className='table-container'>
                                        <Table data={data} inventoryData={inventoryData} revenueData={revenueData} equipmentData1={equipmentData1} clinicalData={clinicalData} />
                                    </div></>}
                                    <div className="button">
                                        <button className='text-right btn btn-primary' onClick={handleResultsData}>
                                            Back
                                        </button>
                                        <button onClick={() => handleTabClick('tab1')} className='btn btn-dark results'>Data Resources <span>(utilized)</span></button>
                                    </div>
                                </div>
                            )}
                            {activeTab === 'tab3' && (
                                <div id="tab2" className="content">
                                    <div className='charts-buttons'>
                                        <button className={`chart-tab ${activeTab === 'tab3' ? 'chart-tab-active' : ''}`} onClick={() => handlePieChart('tab3')}>
                                            Pie Chart
                                        </button>
                                        <button className={`chart-tab ${activeTab === 'tab4' ? 'chart-tab-active' : ''}`} onClick={() => handlePieChart('tab4')}>
                                            Bar Chart
                                        </button>
                                    </div>
                                    {showPieChart && <div className='charts-container'>
                                        <div className='pie-chart'>
                                            <InventoryPieChart data={data} />
                                            {/* <NewChart data={data} chartText={"Product with Lead Times"} pieChartData={inventoryPieData} /> */}
                                        </div>
                                    </div>}
                                    <div className="button">
                                        <button className='text-right btn btn-primary' onClick={handleResultsData}>
                                            Back
                                        </button>
                                        <button onClick={() => handleTabClick('tab1')} className='btn btn-dark results'>Data Resources <span>(utilized)</span></button>
                                    </div>
                                </div>
                            )}
                            {activeTab === 'tab4' && (
                                <div id="tab2" className="content">
                                    <div className='charts-buttons'>
                                        <button className={`chart-tab ${activeTab === 'tab3' ? 'chart-tab-active' : ''}`} onClick={() => handlePieChart('tab3')}>
                                            Pie Chart
                                        </button>
                                        <button className={`chart-tab ${activeTab === 'tab4' ? 'chart-tab-active' : ''}`} onClick={() => handlePieChart('tab4')}>
                                            Bar Chart
                                        </button>
                                    </div>
                                    {showPieChart && <div className='charts-container'>
                                        <div className='bar-chart'>
                                            <InventoryBarChart
                                                data={data}
                                            />
                                        </div>
                                    </div>}
                                    <div className="button">
                                        <button className='text-right btn btn-primary' onClick={handleResultsData}>
                                            Back
                                        </button>
                                        <button onClick={() => handleTabClick('tab1')} className='btn btn-dark results'>Data Resources <span>(utilized)</span></button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                {!revenueData && (
                    <div className='charts-section'>
                        <div className="tab-buttons">
                            <button
                                className={`tab ${activeTab === 'tab1' ? 'activeTab' : ''}`}
                                onClick={() => handleTabClick('tab1')}
                            >
                                Data Resources <span>(utilized)</span>
                            </button>
                            <button
                                className={`tab ${activeTab === 'tab2' ? 'activeTab' : ''}`}
                                onClick={() => handleTabClick('tab2')}
                            >
                                View Model Insights
                            </button>
                        </div>

                        <div className="tab-content">
                            {activeTab === 'tab1' && (<>
                                <div id="tab1" className="content model-datasets-active">
                                    {revenue_model_datasets.map((eachDataset, index) => {
                                        return (
                                            <li key={index} className='model-dataset'>{eachDataset}</li>
                                        )
                                    })}
                                </div>
                                <div className="button">
                                    <button className='text-right btn btn-primary' onClick={handleResultsData}>
                                        Back
                                    </button>
                                    <button onClick={() => handleTabClick('tab2')} className='btn btn-success results'>View Model Insights</button>
                                </div>
                            </>)}
                            {activeTab === 'tab2' && (
                                <div id="tab2" className="content">
                                    <div className='charts-buttons'>
                                        <button className={`chart-tab ${activeTab === 'tab3' ? 'chart-tab-active' : ''}`} onClick={() => handlePieChart('tab3')}>
                                            Pie Chart
                                        </button>
                                        <button className={`chart-tab ${activeTab === 'tab4' ? 'chart-tab-active' : ''}`} onClick={() => handlePieChart('tab4')}>
                                            Bar Chart
                                        </button>
                                    </div>
                                    {showResults && 
                                        <><h1 className='results-heading'>Results:</h1>
                                    <div className='table-container'>
                                        <Table data={data} inventoryData={inventoryData} revenueData={revenueData} equipmentData1={equipmentData1} clinicalData={clinicalData} />
                                    </div></>}
                                    <div className="button">
                                        <button className='text-right btn btn-primary' onClick={handleResultsData}>
                                            Back
                                        </button>
                                        <button onClick={() => handleTabClick('tab1')} className='btn btn-dark results'>Data Resources <span>(utilized)</span></button>
                                    </div>
                                </div>
                            )}
                            {activeTab === 'tab3' && (
                                <div id="tab2" className="content">
                                    <div className='charts-buttons'>
                                        <button className={`chart-tab ${activeTab === 'tab3' ? 'chart-tab-active' : ''}`} onClick={() => handlePieChart('tab3')}>
                                            Pie Chart
                                        </button>
                                        <button className={`chart-tab ${activeTab === 'tab4' ? 'chart-tab-active' : ''}`} onClick={() => handlePieChart('tab4')}>
                                            Bar Chart
                                        </button>
                                    </div>
                                    {showPieChart && <div className='charts-container'>
                                        <div className='pie-chart'>
                                        <RevenuePieChart data={data} />
                                        {/* <PieChart data={data} chartText={"Revenue Share of each Category"} pieChartData={revenuePieData} /> */}
                                        </div>
                                    </div>}
                                    <div className="button">
                                        <button className='text-right btn btn-primary' onClick={handleResultsData}>
                                            Back
                                        </button>
                                        <button onClick={() => handleTabClick('tab1')} className='btn btn-dark results'>Data Resources <span>(utilized)</span></button>
                                    </div>
                                </div>
                            )}
                            {activeTab === 'tab4' && (
                                <div id="tab2" className="content">
                                    <div className='charts-buttons'>
                                        <button className={`chart-tab ${activeTab === 'tab3' ? 'chart-tab-active' : ''}`} onClick={() => handlePieChart('tab3')}>
                                            Pie Chart
                                        </button>
                                        <button className={`chart-tab ${activeTab === 'tab4' ? 'chart-tab-active' : ''}`} onClick={() => handlePieChart('tab4')}>
                                            Bar Chart
                                        </button>
                                    </div>
                                    {showPieChart && <div className='charts-container'>
                                        <div className='bar-chart'>
                                            {/* <BarChart
                                                data={data}
                                                barChartText={"Generation Of Revenue in Future"}
                                                barChartData={revenueBarData}
                                                labelsData={["Sales", "Inventory Levels", "Quantity for each Order"]}
                                            /> */}
                                            <RevenueBarChart data={data}/>
                                        </div>
                                    </div>}
                                    <div className="button">
                                        <button className='text-right btn btn-primary' onClick={handleResultsData}>
                                            Back
                                        </button>
                                        <button onClick={() => handleTabClick('tab1')} className='btn btn-dark results'>Data Resources <span>(utilized)</span></button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                )}
                {!equipmentData1 && (
                    <div className='charts-section'>
                        <div className="tab-buttons">
                            <button
                                className={`tab ${activeTab === 'tab1' ? 'activeTab' : ''}`}
                                onClick={() => handleTabClick('tab1')}
                            >
                                Data Resources <span>(utilized)</span>
                            </button>
                            <button
                                className={`tab ${activeTab === 'tab2' ? 'activeTab' : ''}`}
                                onClick={() => handleTabClick('tab2')}
                            >
                                View Model Insights
                            </button>
                        </div>
                        <div className="tab-content">
                            {activeTab === 'tab1' && (<>
                                <div id="tab1" className="content model-datasets-active">
                                    {equipment_model_datasets.map((eachDataset, index) => {
                                        return (
                                            <li key={index} className='model-dataset'>{eachDataset}</li>
                                        )
                                    })}
                                </div>
                                <div className="button">
                                    <button className='text-right btn btn-primary' onClick={handleResultsData}>
                                        Back
                                    </button>
                                    <button onClick={() => handleTabClick('tab2')} className='btn btn-success results'>View Model Insights</button>
                                </div>
                            </>)}
                            {activeTab === 'tab2' && (
                                <div id="tab2" className="content">
                                    <div className='charts-buttons'>
                                        <button className={`chart-tab ${activeTab === 'tab3' ? 'chart-tab-active' : ''}`} onClick={() => handlePieChart('tab3')}>
                                            Pie Chart
                                        </button>
                                        <button className={`chart-tab ${activeTab === 'tab4' ? 'chart-tab-active' : ''}`} onClick={() => handlePieChart('tab4')}>
                                            Bar Chart
                                        </button>
                                    </div>
                                    {showResults && 
                                        <><h1 className='results-heading'>Results:</h1>
                                    <div className='table-container'>
                                        <Table data={data} inventoryData={inventoryData} revenueData={revenueData} equipmentData1={equipmentData1} clinicalData={clinicalData} />
                                    </div></>}
                                    <div className="button">
                                        <button className='text-right btn btn-primary' onClick={handleResultsData}>
                                            Back
                                        </button>
                                        <button onClick={() => handleTabClick('tab1')} className='btn btn-dark results'>Data Resources <span>(utilized)</span></button>
                                    </div>
                                </div>
                            )}
                            {activeTab === 'tab3' && (
                                <div id="tab2" className="content">
                                    <div className='charts-buttons'>
                                        <button className={`chart-tab ${activeTab === 'tab3' ? 'chart-tab-active' : ''}`} onClick={() => handlePieChart('tab3')}>
                                            Pie Chart
                                        </button>
                                        <button className={`chart-tab ${activeTab === 'tab4' ? 'chart-tab-active' : ''}`} onClick={() => handlePieChart('tab4')}>
                                            Bar Chart
                                        </button>
                                    </div>
                                    {showPieChart && <div className='charts-container'>
                                        <div className='pie-chart'>
                                        <EquipmentPieChart data={data} chartText={"Equipment Share of each Category"} pieChartData={equipmentPieData} />
                                        </div>
                                    </div>}
                                    <div className="button">
                                        <button className='text-right btn btn-primary' onClick={handleResultsData}>
                                            Back
                                        </button>
                                        <button onClick={() => handleTabClick('tab1')} className='btn btn-dark results'>Data Resources <span>(utilized)</span></button>
                                    </div>
                                </div>
                            )}
                            {activeTab === 'tab4' && (
                                <div id="tab2" className="content">
                                    <div className='charts-buttons'>
                                        <button className={`chart-tab ${activeTab === 'tab3' ? 'chart-tab-active' : ''}`} onClick={() => handlePieChart('tab3')}>
                                            Pie Chart
                                        </button>
                                        <button className={`chart-tab ${activeTab === 'tab4' ? 'chart-tab-active' : ''}`} onClick={() => handlePieChart('tab4')}>
                                            Bar Chart
                                        </button>
                                    </div>
                                    {showPieChart && <div className='charts-container'>
                                        <div className='bar-chart'>
                                        <EquipmentBarChart
                                                data={data}
                                            />
                                        </div>
                                    </div>}
                                    <div className="button">
                                        <button className='text-right btn btn-primary' onClick={handleResultsData}>
                                            Back
                                        </button>
                                        <button onClick={() => handleTabClick('tab1')} className='btn btn-dark results'>Data Resources <span>(utilized)</span></button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                )}
                {!clinicalData && (
                    <div className='charts-section'>
                        {/* Tab buttons */}
                        <div className="tab-buttons">
                            <button
                                className={`tab ${activeTab === 'tab1' ? 'activeTab' : ''}`}
                                onClick={() => handleTabClick('tab1')}
                            >
                                Data Resources <span>(utilized)</span>
                            </button>
                            <button
                                className={`tab ${activeTab === 'tab2' ? 'activeTab' : ''}`}
                                onClick={() => handleTabClick('tab2')}
                            >
                                View Model Insights
                            </button>
                        </div>

                        {/* Tab content */}
                        <div className="tab-content">
                            {activeTab === 'tab1' && (<>
                                <div id="tab1" className="content model-datasets-active">
                                    {clinical_model_datasets.map((eachDataset, index) => {
                                        return (
                                            <li key={index} className='model-dataset'>{eachDataset}</li>
                                        )
                                    })}
                                </div>
                                <div className="button">
                                    <button className='text-right btn btn-primary' onClick={handleResultsData}>
                                        Back
                                    </button>
                                    <button onClick={() => handleTabClick('tab2')} className='btn btn-success results'>View Model Insights</button>
                                </div>
                            </>)}
                            {activeTab === 'tab2' && (
                                <div id="tab2" className="content">
                                    <div className='charts-buttons'>
                                        <button className={`chart-tab ${activeTab === 'tab3' ? 'chart-tab-active' : ''}`} onClick={() => handlePieChart('tab3')}>
                                            Pie Chart
                                        </button>
                                        <button className={`chart-tab ${activeTab === 'tab4' ? 'chart-tab-active' : ''}`} onClick={() => handlePieChart('tab4')}>
                                            Bar Chart
                                        </button>
                                    </div>
                                    {showResults && 
                                        <><h1 className='results-heading'>Results:</h1>
                                    <div className='table-container'>
                                        <Table data={data} inventoryData={inventoryData} revenueData={revenueData} equipmentData1={equipmentData1} clinicalData={clinicalData} />
                                    </div></>}
                                    <div className="button">
                                        <button className='text-right btn btn-primary' onClick={handleResultsData}>
                                            Back
                                        </button>
                                        <button onClick={() => handleTabClick('tab1')} className='btn btn-dark results'>Data Resources <span>(utilized)</span></button>
                                    </div>
                                </div>
                            )}
                            {activeTab === 'tab3' && (
                                <div id="tab2" className="content">
                                    <div className='charts-buttons'>
                                        <button className={`chart-tab ${activeTab === 'tab3' ? 'chart-tab-active' : ''}`} onClick={() => handlePieChart('tab3')}>
                                            Pie Chart
                                        </button>
                                        <button className={`chart-tab ${activeTab === 'tab4' ? 'chart-tab-active' : ''}`} onClick={() => handlePieChart('tab4')}>
                                            Bar Chart
                                        </button>
                                    </div>
                                    {showPieChart && <div className='charts-container'>
                                        <div className='pie-chart'>
                                            <ClinicalPieChart data={data}  />
                                        </div>
                                    </div>}
                                    <div className="button">
                                        <button className='text-right btn btn-primary' onClick={handleResultsData}>
                                            Back
                                        </button>
                                        <button onClick={() => handleTabClick('tab1')} className='btn btn-dark results'>Data Resources <span>(utilized)</span></button>
                                    </div>
                                </div>
                            )}
                            {activeTab === 'tab4' && (
                                <div id="tab2" className="content">
                                    <div className='charts-buttons'>
                                        <button className={`chart-tab ${activeTab === 'tab3' ? 'chart-tab-active' : ''}`} onClick={() => handlePieChart('tab3')}>
                                            Pie Chart
                                        </button>
                                        <button className={`chart-tab ${activeTab === 'tab4' ? 'chart-tab-active' : ''}`} onClick={() => handlePieChart('tab4')}>
                                            Bar Chart
                                        </button>
                                    </div>
                                    {showPieChart && <div className='charts-container'>
                                        <div className='bar-chart'>
                                        <ClinicalBarChart
                                            data={data}
                                        />
                                        </div>
                                    </div>}
                                    <div className="button">
                                        <button className='text-right btn btn-primary' onClick={handleResultsData}>
                                            Back
                                        </button>
                                        <button onClick={() => handleTabClick('tab1')} className='btn btn-dark results'>Data Resources <span>(utilized)</span></button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                )}
            </div>
        </div>
    </>
    );
}

export default DataModeling