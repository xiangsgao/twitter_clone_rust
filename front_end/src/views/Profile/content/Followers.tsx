import { Avatar, Card, List } from "antd"

export const Followers = () =>{
    return (
        <List 
        itemLayout="horizontal"
        renderItem={(item) =>(
            <List.Item>
                <List.Item.Meta
                avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                title={<a href="https://ant.design">{item.title}</a>}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
            </List.Item>
    )} />
    )
}