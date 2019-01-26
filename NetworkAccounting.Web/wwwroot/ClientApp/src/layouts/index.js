import {Layout} from 'antd';
import Link from 'umi/link';

const {
  Header, Footer, Sider, Content,
} = Layout;

import {Menu, Icon} from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

import router from 'umi/router';

function menuClick(e) {
  console.log(e)
}

function BasicLayout(props) {
  return (
    <Layout>
      <Header style={{color: 'white'}}>Network Accounting</Header>
      <Content>
        <Layout>
          <Sider>
            <Menu mode={'inline'} defaultOpenKeys={['components']}>
              <SubMenu key={'components'} title={<span><Icon type={'mail'}></Icon><span>Components</span></span>}>
                <Menu.Item key={'g1'}><Link to='/networks'>Networks</Link></Menu.Item>
                <Menu.Item key={'g2'}><Link to='/pools'>Pools</Link></Menu.Item>
              </SubMenu>
              <SubMenu key={'system'} title={<span><Icon type={'mail'}></Icon><span>Managment</span></span>}>
                <Menu.Item key={'g3'}>Log</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Content>{props.children}</Content>
        </Layout>
      </Content>
    </Layout>
  );
}

export default BasicLayout;
