var data = [
  {"quarter":"Q1","hits":0,"date":"01/01/2011"},
  {"quarter":"Q1","hits":0,"date":"01/15/2011"},
  {"quarter":"Q1","hits":0,"date":"02/01/2011"},
  {"quarter":"Q1","hits":0,"date":"02/15/2011"},
  {"quarter":"Q1","hits":0,"date":"03/01/2011"},
  {"quarter":"Q1","hits":0,"date":"03/15/2011"},
  {"quarter":"Q2","hits":0,"date":"04/01/2011"},
  {"quarter":"Q2","hits":0,"date":"04/15/2011"},
  {"quarter":"Q2","hits":0,"date":"05/01/2011"},
  {"quarter":"Q2","hits":0,"date":"05/15/2011"},
  {"quarter":"Q2","hits":0,"date":"06/01/2011"},
  {"quarter":"Q2","hits":0,"date":"06/15/2011"},
  {"quarter":"Q3","hits":0,"date":"07/01/2011"},
  {"quarter":"Q3","hits":0,"date":"07/15/2011"},
  {"quarter":"Q3","hits":0,"date":"08/01/2011"},
  {"quarter":"Q3","hits":0,"date":"08/15/2011"},
  {"quarter":"Q3","hits":0,"date":"09/01/2011"},
  {"quarter":"Q3","hits":0,"date":"09/15/2011"},
  {"quarter":"Q4","hits":12,"date":"10/01/2011"},
  {"quarter":"Q4","hits":13,"date":"10/15/2011"},
  {"quarter":"Q4","hits":16,"date":"11/01/2011"},
  {"quarter":"Q4","hits":15,"date":"11/15/2011"},
  {"quarter":"Q4","hits":12,"date":"12/01/2011"},
  {"quarter":"Q4","hits":10,"date":"12/15/2011"},

  {"quarter":"Q1","hits":25,"date":"01/01/2012"},
  {"quarter":"Q1","hits":27,"date":"01/15/2012"},
  {"quarter":"Q1","hits":28,"date":"02/01/2012"},
  {"quarter":"Q1","hits":26,"date":"02/15/2012"},
  {"quarter":"Q1","hits":29,"date":"03/01/2012"},
  {"quarter":"Q1","hits":24,"date":"03/15/2012"},
  {"quarter":"Q2","hits":36,"date":"04/01/2012"},
  {"quarter":"Q2","hits":33,"date":"04/15/2012"},
  {"quarter":"Q2","hits":35,"date":"05/01/2012"},
  {"quarter":"Q2","hits":35,"date":"05/15/2012"},
  {"quarter":"Q2","hits":39,"date":"06/01/2012"},
  {"quarter":"Q2","hits":34,"date":"06/15/2012"},
  {"quarter":"Q3","hits":41,"date":"07/01/2012"},
  {"quarter":"Q3","hits":45,"date":"07/15/2012"},
  {"quarter":"Q3","hits":40,"date":"08/01/2012"},
  {"quarter":"Q3","hits":42,"date":"08/15/2012"},
  {"quarter":"Q3","hits":47,"date":"09/01/2012"},
  {"quarter":"Q3","hits":43,"date":"09/15/2012"},
  {"quarter":"Q4","hits":55,"date":"10/01/2012"},
  {"quarter":"Q4","hits":57,"date":"10/15/2012"},
  {"quarter":"Q4","hits":54,"date":"11/01/2012"},
  {"quarter":"Q4","hits":53,"date":"11/15/2012"},
  {"quarter":"Q4","hits":51,"date":"12/01/2012"},
  {"quarter":"Q4","hits":50,"date":"12/15/2012"},

  {"quarter":"Q1","hits":32,"date":"01/01/2013"},
  {"quarter":"Q1","hits":36,"date":"01/15/2013"},
  {"quarter":"Q1","hits":34,"date":"02/01/2013"},
  {"quarter":"Q1","hits":31,"date":"02/15/2013"},
  {"quarter":"Q1","hits":33,"date":"03/01/2013"},
  {"quarter":"Q1","hits":36,"date":"03/15/2013"},
  {"quarter":"Q2","hits":45,"date":"04/01/2013"},
  {"quarter":"Q2","hits":40,"date":"04/15/2013"},
  {"quarter":"Q2","hits":42,"date":"05/01/2013"},
  {"quarter":"Q2","hits":49,"date":"05/15/2013"},
  {"quarter":"Q2","hits":44,"date":"06/01/2013"},
  {"quarter":"Q2","hits":42,"date":"06/15/2013"},
  {"quarter":"Q3","hits":58,"date":"07/01/2013"},
  {"quarter":"Q3","hits":53,"date":"07/15/2013"},
  {"quarter":"Q3","hits":58,"date":"08/01/2013"},
  {"quarter":"Q3","hits":52,"date":"08/15/2013"},
  {"quarter":"Q3","hits":54,"date":"09/01/2013"},
  {"quarter":"Q3","hits":58,"date":"09/15/2013"},
  {"quarter":"Q4","hits":65,"date":"10/01/2013"},
  {"quarter":"Q4","hits":63,"date":"10/15/2013"},
  {"quarter":"Q4","hits":66,"date":"11/01/2013"},
  {"quarter":"Q4","hits":64,"date":"11/15/2013"},
  {"quarter":"Q4","hits":68,"date":"12/01/2013"},
  {"quarter":"Q4","hits":63,"date":"12/15/2013"}
];

var dateParse = d3.time.format("%m/%d/%Y").parse;
var dateParse2 = d3.time.format("%m/%d").parse;

data.forEach(function(d){
  d.date = dateParse(d.date);
  d.qtime = dateParse2((d.date.getMonth()+1)+"/"+d.date.getDate());
  d.Year = d.date.getFullYear();
});

var ndx = crossfilter(data);

/************
 年为维度画饼图
 *************/
var yearDim = ndx.dimension(function(d){ return +d.Year;});
var yearHits = yearDim.group().reduceSum(function(d){return +d.hits;});
var yearPieChart = dc.pieChart("#year-pie-chart");
yearPieChart.width(200)
  .height(200)
  .dimension(yearDim)
  .group(yearHits)
  .innerRadius(45);

dc.renderAll();

console.log(data);