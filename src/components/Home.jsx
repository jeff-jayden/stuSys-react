import React from "react";
import {useState, useEffect} from "react";
import {useLocation, NavLink} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import {fetchStuList} from "../store/modules/stuSlice";
import Alert from "./Alert";

function Home() {
    const {stuList} = useSelector(state => state.stu);
    const dispatch = useDispatch();

    const location = useLocation();
    const [searchItem, setSearchItem] = useState("");
    const [alert, setAlert] = useState(null);
    const [searchList, setSearchList] = useState([]);



    // 注意，这里需要添加依赖性为空数组，代表只执行一次
    useEffect(() => {
        dispatch(fetchStuList());
        // console.log(stuList);
    }, [dispatch,stuList]);

    useEffect(() => {
        if (location.state) {
            setAlert(location.state);
        }
    }, [location]);

    const showAlert = alert ? <Alert {...alert} /> : null;

    function changeHandle(name) {
        setSearchItem(name);
        let arr = stuList.filter((item) => item.name.match(name));
        setSearchList(arr);
    }

    const list = searchItem ? searchList : stuList;
    const trs = list.map((item, index) => {
        return (
            <tr key={index}>
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td>{item.phone}</td>
                <td>
                    <NavLink to={`/detail/${item.id}`}>详情</NavLink>
                </td>
            </tr>
        );
    });

    return (
        <div>
            {showAlert}
            <h1>学生列表</h1>
            {/* 搜索框 */}
            <input
                type="text"
                placeholder="搜索"
                className="form-control"
                value={searchItem}
                onChange={(e) => changeHandle(e.target.value)}
            />
            {/* 表格 */}
            <table className="table table-striped table-bordered">
                <thead>
                <tr>
                    <th>姓名</th>
                    <th>年龄</th>
                    <th>联系方式</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>{trs}</tbody>
            </table>
        </div>
    );
}

export default Home;
