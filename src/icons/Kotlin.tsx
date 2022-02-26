import BaseProps from "../common/interface/BaseProps";
import React from "react";

export class Kotlin extends React.Component<BaseProps> {
	render() {
		return (
			<svg
				className={this.props.className}
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
				x="0px"
				y="0px"
				viewBox="0 0 60 60"
			>
				<g>

					<linearGradient
						id="XMLID_3_"
						gradientUnits="userSpaceOnUse"
						x1="15.9594"
						y1="-13.0143"
						x2="44.3068"
						y2="15.3332"
						gradientTransform="matrix(1 0 0 -1 0 61)"
					>
						<stop  offset="9.677000e-02"
							   style={{ stopColor: "#0095D5", }}/>
						<stop  offset="0.3007"
							   style={{ stopColor: "#238AD9", }}/>
						<stop  offset="0.6211"
							   style={{ stopColor: "#557BDE", }}/>
						<stop  offset="0.8643"
							   style={{ stopColor: "#7472E2", }}/>
						<stop  offset="1"
							   style={{ stopColor: "#806EE3", }}/>
					</linearGradient>
					<polygon id="XMLID_2_"
							 style={{ fill: "url(#XMLID_3_)" }}
							 points="0,60 30.1,29.9 60,60 	"/>

					<linearGradient id="SVGID_1_"
									gradientUnits="userSpaceOnUse"
									x1="4.2092"
									y1="48.9409"
									x2="20.6734"
									y2="65.405"
									gradientTransform="matrix(1 0 0 -1 0 61)">
						<stop  offset="0.1183"
							   style={{ stopColor: "#0095D5", }}/>
						<stop  offset="0.4178"
							   style={{ stopColor: "#3C83DC", }}/>
						<stop  offset="0.6962"
							   style={{ stopColor: "#6D74E1", }}/>
						<stop  offset="0.8333"
							   style={{ stopColor: "#806EE3", }}/>
					</linearGradient>
					<polygon style={{
						fill: "url(#SVGID_1_)",
					}}
							 points="0,0 30.1,0 0,32.5 	"/>

					<linearGradient id="SVGID_2_"
									gradientUnits="userSpaceOnUse"
									x1="-10.1017"
									y1="5.8362"
									x2="45.7315"
									y2="61.6694"
									gradientTransform="matrix(1 0 0 -1 0 61)">
						<stop  offset="0.1075"
							   style={{ stopColor: "#C757BC", }}/>
						<stop  offset="0.2138"
							   style={{ stopColor: "#D0609A", }}/>
						<stop  offset="0.4254"
							   style={{ stopColor: "#E1725C", }}/>
						<stop  offset="0.60"
							   style={{ stopColor: "#EE7E2F", }}/>
						<stop  offset="0.743"
							   style={{ stopColor: "#F58613", }}/>
						<stop  offset="0.8232"
							   style={{ stopColor: "#F88909", }}/>
					</linearGradient>
					<polygon style={{ fill: "url(#SVGID_2_)" }}
							 points="30.1,0 0,31.7 0,60 30.1,29.9 60,0 	"/>
				</g>
			</svg>

		);
	}
}
