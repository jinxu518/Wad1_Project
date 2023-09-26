import React, { useRef, useState } from 'react';
import { Button, Spin, message } from 'antd';
import { AudioOutlined, RedditOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';
import { OpenAI } from 'openai';

function Robot() {
    // in real enviroment the key should be encrypted
    const apiKey = "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";

    const [inputValue, setInputValue] = useState('');
    const [answerList, setAnswerList] = useState([]);
    const preItem = useRef(null);
    const scrollTarget = useRef(null);

    const [messageApi, contextHolder] = message.useMessage();
    // const isDevelopment = process.env.NODE_ENV === 'development';

    const openai = new OpenAI({
        apiKey, 
        dangerouslyAllowBrowser: true,
    });

    const quize = () => {
        const questionText = inputValue;
        setAnswerList([
            ...answerList,
            {
                type: 'question',
                content: inputValue,
                isFinshed: 1,
            },
            {
                type: 'answer',
                content: 'thinking',
                isFinshed: 0,
            },
        ]);
        scrollTarget.current = preItem.current;
        setInputValue('');
        getMessage(questionText);
    };

    const getMessage = async (questionText) => {
        try {
            const response = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: 'system',
                        content: 'You are a helpful assistant.',
                    },
                    {
                        role: 'user',
                        content: questionText,
                    },
                ],
            });

            setAnswerList((answerList) =>
                answerList.map((item, index) => {
                    if (index < answerList.length - 1) {
                        return item;
                    } else {
                        return {
                            type: 'answer',
                            content: response?.choices[0]?.message?.content?.replace(/\n{2}/, ' '),
                            isFinshed: 1,
                        };
                    }
                })
            );
        } catch (e) {
            messageApi.open({
                type: 'error',
                content: e.message,
            });
        }
    };
    const handleInputKeyDown = (e) => {
        e.preventDefault();
        if (e.keyCode === 13) {
            quize();
        }
    };

    return (
        <div style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '320px',
            maxHeight: '500px',
            padding: '3px',
            // backgroundColor: '#8a2be2',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
            borderRadius: '5px',
            overflow: 'scroll',
        }}>
            {contextHolder}
            <div style={{
                display: 'flex',
                alignItems: 'center',
            }}>
                <img src="../images/ai.png" className='image' />
                <input
                    type="text"
                    className="input"
                    value={inputValue}
                    border-radius="2px"
                    // backgroundColor="#E6E6FA"
                    border="2px solid #CCCCCC"
                    placeholder="ask me anything u want"
                    onChange={(e) =>{
                        setInputValue(e.target.value);
                    } }
                ></input>
                <button style={{
                    marginLeft: '1px', // 左边距，使按钮与输入框分开
                    backgroundColor: '#1890ff', // 背景颜色
                    color: 'white', // 文本颜色
                    border: 'none', // 去除边框
                    borderRadius: '4px', // 圆角
                    padding: '3px 8px', // 内边距
                    cursor: 'pointer', // 鼠标指针样式
                }}
                    type="primary"
                    size="small"
                    onClick={quize}
                    onKeyDown={handleInputKeyDown}
                >
                    ask
                </button>
            </div>
            <div className="answer_box">
                <div className="answer">
                    {answerList.map((item, index) => {
                        if (item.type === 'question') {
                            return (
                                <div className="item" key={index}>
                                    <div>
                                        <AudioOutlined style={{ fontSize: '24px', color: '#646cffaa' }} />
                                    </div>
                                    <span className="span">{item.content}</span>
                                </div>
                            );
                        } else {
                            if (item.isFinshed === 0) {
                                // loading
                                return (
                                    <div className="item" ref={preItem} key={index}>
                                        <div>
                                            <RedditOutlined style={{ fontSize: '24px', color: '#42b883aa' }} />
                                        </div>
                                        <span className="span">
                                            <Spin />
                                        </span>
                                    </div>
                                );
                            } else {
                                // answer
                                return (
                                    <div className="item" key={index}>
                                        <div>
                                            <RedditOutlined style={{ fontSize: '24px', color: '#42b883aa' }} />
                                        </div>
                                        <span className="span">{item.content}</span>
                                    </div>
                                );
                            }
                        }
                    })}
                </div>
            </div>
            {scrollTarget.current && scrollTarget.current.scrollIntoView()}
        </div>
    );
}

export default Robot;