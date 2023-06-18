import { styled } from "styled-components";

export const Styled = styled.div`
    width: 100%;
    height: 50px;
    box-shadow: 0px 5px 16px rgba(8, 15, 52, 0.06);
    display: flex;
    justify-content: space-between;
    padding: 15px 25px;
    .left{
        cursor: pointer;
        font-size: 33px;
        font-weight: 600;
        margin-top: -12px;
        height: fit-content;
        background: -webkit-linear-gradient(#eee, #002c8c);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    .right{
        display: flex;
        .balance{
            margin-top: 3px;
            display: flex;
            font-size: 14px;
            div:nth-child(1){
                margin-right:5px;
            }
        }
        .menu-group{
            position: relative;
            height: 50px;
            width: 60px;
            margin-right: -24px;
            cursor: pointer;
            &:hover{
                .profile-menu{
                    display: block;
                }
            }
            .custom-svg-icon{
                margin-left: 20px;
                &:hover{
                    opacity: 0.9;
                }
            }
            .profile-menu{
                display: none;
                position: absolute;
                background: #eee;
                box-shadow: 0px 5px 16px rgba(8, 15, 52, 0.16);
                top: 40px;
                right: 10px;
                border-radius: 5px;
                width: 200px;
                text-align: right;
                padding: 10px 0px;
                .item{
                    padding: 10px;
                    cursor: pointer;
                    &:hover{
                        background-color: #ccc;
                    }
                    &.devided{
                        padding: 0;
                        margin: 5px 0px;
                        border-top: solid 1px #ccc;
                    }
                }
            }
        }
    }
`;