import styled from "styled-components";

export const Styled = styled.div`
    width: 100%;
    display: flex;
    height: 100%;
    justify-content: center;
    .group{
        display: flex;
        flex-direction: column;
        justify-content: center;
        @media screen and (max-width: 433px) {
            width: 100%;
            margin: 0 20px;
            .form{
                width: 100% !important;
            }
        }
        .form{
            box-shadow: 0px 5px 16px rgba(8, 15, 52, 0.06);
            border: solid 1px #ccc;
            background: #eee;
            padding: 10px;
            width: 400px;
            border-radius: 5px;
            .title{
                text-transform: capitalize;
                margin-bottom: 10px;
                font-size: 20px;
            }
            .input{
                height: 65px;
                input.ierr{
                    border-color: red;
                    &:focus-visible{
                        outline: none;
                    }
                }
                .error{
                    margin: 5px 0px;
                    font-size: 12px;
                    color: red;
                }
            }

            .bottom{
                display: flex;
                justify-content: space-between;
                button{
                    width: 100px;
                }
                a{
                    padding-top: 5px;
                    font-size: 13px;
                    color: #061178;
                    &:hover{
                        text-decoration: underline;
                    }
                }
            }
        }
    }
`;