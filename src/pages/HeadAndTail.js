import { useState } from 'react';
import _ from 'underscore'

export default function HeadAndTail() {
	const [key, setKey] = useState()
	const [headAndTailData, setHeadAndTailData] = useState([])
	const [headOrTail, setHeadOrTail] = useState()
	const [errorMessage, setErrorMessage] = useState(false);

	const handleChange = (e) => {
		setErrorMessage(false)
		setKey(e.target.value)
	}

	const handleSubmit = (e) => {
		if (key) {
			function htFn(value) {
				const htArr = []
				htArr.push(value)
				setHeadAndTailData([...headAndTailData, htArr])
			}
			const nValue = key
			
			if (!headAndTailData.length) htFn(nValue)
			else {
				if (headOrTail === nValue) {
					const htData = _.map(headAndTailData, (item, i) => {
						if (i === headAndTailData.length-1) item.push(nValue)
						return item
					})
					setHeadAndTailData(htData)
				} else htFn(nValue)
			}
			setHeadOrTail(nValue)
			setKey('')
		} else setErrorMessage(true)
		
	}

	return (
		<div className="ht-page">
			<div className="m-t-10">
				<div className="m-t-10">
					<select name="name" value={key} onChange={(e) => handleChange(e)} >
						<option value="">Select option</option>
						<option value="H">H</option>
						<option value="T">T</option>
					</select>
					{errorMessage && (
						<span className="error-msg"> Please select value </span>
					)}
				</div>
                <button className="m-t-10" type="submit" onClick={(e) => handleSubmit(e)} >Submit</button>
			</div>
			<div className="d-flex m-t-20">
				{ 	headAndTailData.length ? headAndTailData.map((item, i) => {
						return(
							<div key={i} className="m-r-20">
								{ 	item && item.map((iItem, index) => {
										return(
											<div key={index}>
												{iItem}
											</div>
										)
									})
								}
							</div>
						)
					}) : <></>
				}
			</div>
		</div>
	);
}