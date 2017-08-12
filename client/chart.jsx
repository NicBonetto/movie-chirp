import React from 'react'
import { PieChart } from 'react-d3'
import { connect } from 'react-redux'

class Chart extends React.Component {
  hasSentiment() {
    const data = []
    const pos = this.props.sentiment[0].positive
    const neg = this.props.sentiment[1].negative
    const neut = this.props.sentiment[2].neutral

    const sum = [pos, neg, neut].reduce((total, value) =>
      (total + value)
    )

    let positive = (pos / sum) * 100
    let negative = (neg / sum) * 100
    let neutral = (neut / sum) * 100

    if (this.props.sentiment[0].positive > 0) data.push({ label: 'Positive', value: positive.toFixed(1) })
    if (this.props.sentiment[1].negative > 0) data.push({ label: 'Negative', value: negative.toFixed(1) })
    if (this.props.sentiment[2].neutral > 0) data.push({ label: 'Neutral', value: neutral.toFixed(1) })

    return data
  }

  render() {
    return (
      <div className="col-md-7">
        <div className="card" id="chart-container">
          <div className="card-header" id="chart-header">
            Streaming Sentiment
          </div>
          <div id="chart-stream">
            <PieChart
              data={this.hasSentiment()}
              width={400}
              height={400}
              radius={100}
              innerRadius={35}
              sectorBorderColor='white'
              title=''
            />
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {sentiment: state.sentiments}
}

export default connect(mapStateToProps)(Chart)
