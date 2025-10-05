import React from 'react';
import './Header.css';

export default ({black}) =>{
    return(
        <header className={black ? 'black' : ''}>
            <div className="header--logo">
                <a href='/'>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"></img>
                </a>
            </div>
            <div className="header--user">
                <a href='/'>
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKIAAACUCAMAAAAnDwKZAAAAtFBMVEUYcnL///////3///sAbG8AbGwAamsAZ2oAbm8RcHL//vIAaWYAbGn///iit6EAaGj08+CZsZgAbGUgblcqd2aSrZa9y7bN2MWuw69+nX8WbF9UiHGmv6vJ0rimuZ5KhHI2e24gcWljkoXn6tbc4cxdkHtWinqJq5nT3tBxmYpYjIPu8u2cuat+oIzh59+uxcFKg3jBzsFRhWVijG4wenSRqYqbsY3f5sk3dl7Cy6gAXFyGpYCU8ynfAAADt0lEQVR4nO3aa3OaTBQAYHeXyy4XQZoAGlFAjVoCIdWktv3//6sLJr6Aqc0iTGbenudLO5OBPZ69MXt2MAAAAAAAAAAAAAAAAAAAAAAAAAA+AVN0w7CkHluglmHoCm37OLNubl3P88cTtcuoKqh+Nw28YDbX26WBhoGJSvYoav07L2BOvMBlA2QZW0z8BXK8QK8wcsMeYoyG5lsLSLs1hJ+nuY3w6/MEIy9s8SsvU2cYk0qMsuDzzDnl8JhH3+o4QrrC1RaQdi/YUcq68guLPGrzbruaRRtUj9ETTEKU1V6AO08j3Zq41gIiYmmkXxPUsIk6DdF4wKSeBDISWtukVGuGmHU7YYxHVA+RoEehEOXUPAsx7zbEJ1QfizxEoaHER0rPWXQemw1gXyiLZ2ORr4zia+sl8kN9PvOxuBbbZ/mSUHsBQUOl0xBpnDRaSAS7SUkbL9BuOt5ejGV9WUOB6Kqme9UZh8lt11879JuJCTm9H9mh6EiieXUHxK7R/R69/m/x5rtXKrpHF99iS1zkv3iNOXM6j5DPmHFSThPeArZ3bYY6nQw35QKuPaVtvub+zpq79nFB8+ftvmmZvL9/nr2M80EfH7QFaoTbl9lLHBrtW6CSokq9ZPDUgqKofWUAAAAAAAAAAAAAAPzbqGKpfRbmr8as++n3YN1tRaJGUnXrigM+ph6GxUGoOe3r7sCAzmeLp3RvtOsoKcp9DZfn1WbcU1/TeXlsv5iFLZIgOytXQ2VZGRMiVmD7ON19PfPPRhOxmyJUcdKlVim+POq9RMjy7NSE5q+iD577M2rt49ez+LcCm5n21NH5qbbO/7G98USV/zJ1GJPVLzt/Y9ZLqdrQ6SfCQeTWKnFEC7b7yJDp+3EyKjn7PHXtZqGWeHfd1hirjUZBLRtlLqfp7kbnqzFlrAiV8dCopKq6cRff+stGNR5jRJZpy8tEH0LD2dkNAGQmmefPxl/nh8MX7nAT5uNn/2mZJGd1bh7jYhz1u7cw1fnRqF6TtwonMbUj85TjJs1bXbPyfzRI/X5YnZ28744FyOodkuL/+CxE29864vXJNqixTzPyTo4uIdomvaa0JkyZrPwFOdZeL8R6+pu9Gd3pSu89XEedPPbt97rzjB2kedT+2uJVUao/DyMvS8w/RWlq2cYdffv5qZ+HfOsN4/U02CT1tYhodhY8rLd5dMWtz84wKsvOIArz3fNoWBj9+rXbh9HA4NvOH/adT8H4bse3lJIkSceNBgAAAAAAAAAAAAAA8D/xG7JfOZuJQumOAAAAAElFTkSuQmCC"></img>
                </a>
            </div>
        </header>
    )
}