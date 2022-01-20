import React,{Component}from 'react'
import { Route } from 'react-router-dom'
import { Layout, Menu, Avatar, Input } from 'antd';
import { MailOutlined, BellOutlined, SearchOutlined } from '@ant-design/icons';
import './homeTemplateConfig.css'
import history from '../../util/history';
import InputSearch from '../../component/InputSearch';


const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;
type homTemplateProps = {
    Component: any,
    title: string,
    exact:any,
    path: any

}

export default function HomeTemPlate(props: homTemplateProps) {
    const { Component, title, ...resParams } = props
    console.log('component', Component)
    return (
        <Route {...resParams} render={(propRoute) => {
            return <div className='relative h-screen'>
                {/* navbar */}
                <Layout id='myNavBar'>
                    <Sider
                        breakpoint="lg"
                        collapsedWidth="0"
                        onBreakpoint={broken => {
                            console.log(broken);
                        }}
                        onCollapse={(collapsed, type) => {
                            console.log(collapsed, type);
                        }}
                    >
                        <div className="logo" style={{ marginBottom: '59px' }}>
                            <img style={{ height: '58px', width: '133px' }} src={require('../../assets/img/insight-logo.png')} alt='insight-logo_img'></img>
                        </div>
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                            <Menu.Item key="1" icon={<i className="fa fa-home"></i>} onClick={() => {
                                history.push('/trangchu')
                            }}>
                                Trang chủ
                            </Menu.Item>
                            <Menu.Item key="2" onClick={() => {
                                history.push('/quanlyve')
                            }} icon={<i className ="fa fa-ticket-alt"></i>}>
                                Quản lý vé
                            </Menu.Item>
                            <Menu.Item key="3" onClick={() => {
                                history.push('/doisoatve')
                            }} icon={<i className = "fa fa-money-check-alt"></i>}>
                                Đổi soát vé
                            </Menu.Item>
                            <SubMenu key="sub1" icon={<i className = "fa fa-cog"></i>} title="Cài đặt">
                                <Menu.Item key="item1" onClick={() => {
                                    history.push('/caidat')
                                }}>Gói dịch vụ</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout style={{ background: 'white' }}>
                        <Header className="site-layout-sub-header-background" style={{ padding: 0 }} >
                            <div className='flex justify-between' id='myHeader'>
                                {/* input search */}
                                <InputSearch placeholder = 'Search'/>

                                {/* intro */}
                                <div className='flex items-center'>
                                    <MailOutlined className='cursor-pointer' style={{ height: '7px', width: '20px' }} />
                                    <BellOutlined className='cursor-pointer' style={{ height: '7px', width: '20px', margin: "0 29px" }} />
                                    <Avatar className='cursor-pointer' style={{ backgroundColor: '#87d068' }} icon={<img className='rounded' style={{ height: '48px', width: '48px' }} src='https://picsum.photos/48/48' alt='avatar_img'></img>} />
                                </div>

                            </div>
                        </Header>
                        <Content>
                            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                                <h1 className='title'>{title}</h1>
                                <Component {...propRoute}></Component>
                            </div>
                        </Content>

                    </Layout>
                </Layout>

            </div>
        }}>
        </Route>
    )
}
