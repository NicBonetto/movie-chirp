import React from 'react'
import { PieChart } from 'react-d3'
import { connect } from 'react-redux'

class Chart extends React.Component {
  overallSentiment() {
    let overall
    if (this.props.sentiment[0].positive === 0 && this.props.sentiment[1].negative === 0 && this.props.sentiment[2].neutral ===0) return
    (this.props.sentiment[0].negative > this.props.sentiment[1].positive) ? overall = (<span className="fa fa-thumbs-o-down negative"></span>) : overall = (<span className="fa fa-thumbs-o-up positive"></span>)
    return overall
  }

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
        <div id="popular-opinion">
          <h3>
            Popular Opinion
          </h3>
          <div>
            {this.overallSentiment()}
          </div>
        </div>
        <div className="card" id="chart-container">
          <div className="card-header" id="chart-header">
            Streaming Sentiment <span className="fa fa-pie-chart"></span>
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
