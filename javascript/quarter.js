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

/***********************
 Common Area Chart data
 ***********************/

var qtimeDim = ndx.dimension(function(d){return d.qtime;});
var qtimeHits = qtimeDim.group().reduceSum(function(d){return d.hits;});

//Hits by year
var hits_2011 = qtimeDim.group().reduceSum(function(d){
  return d.Year === 2011 ? d.hits : 0;
});
var hits_2012 = qtimeDim.group().reduceSum(function(d){
  return d.Year === 2012 ? d.hits : 0;
});
var hits_2013 = qtimeDim.group().reduceSum(function(d){
  return d.Year === 2013 ? d.hits : 0;
});

//Hits Target by year
var target_2011 = qtimeDim.group().reduceSum(function(d){
  return d.Year === 2011 ? 10 : 0;
});
var target_2012 = qtimeDim.group().reduceSum(function(d){
  return d.Year === 2012 ? 20 : 0;
});
var target_2013 = qtimeDim.group().reduceSum(function(d){
  return d.Year === 2013 ? 30 : 0;
});



/***************
 Q1
***************/

var lineChart_q1 = dc.compositeChart("#q1-line-chart");
var minDate_q1 = new Date("01/01/1900");
var maxDate_q1 = new Date("03/15/1900");

var compose1 = dc.lineChart(lineChart_q1)
                  .dimension(qtimeHits)
                  .ordinalColors(["#56B2EA","#E064CD","#F8B700","#78CC00","#7B71C5"])
                  .renderArea(true)
                  .group(hits_2011, "2011")
                  .stack(hits_2012, "2012")
                  .stack(hits_2013, "2013");

var compose2 = dc.lineChart(lineChart_q1)
                  .dimension(qtimeDim)
                  .ordinalColors(["#56B2EA","#E064CD","#F8B700","#78CC00","#7B71C5"])
                  .group(target_2011,"2011 Target")
                  .stack(target_2012,"2012 Target")
                  .stack(target_2013,"2013 Target")
                  .dashStyle([5,5]);

lineChart_q1.width(210)
            .height(300)
            .x(d3.time.scale().domain([minDate_q1,maxDate_q1]))
            .brushOn(false)
            .legend(dc.legend().x(60).y(10).itemHeight(13).gap(5))
            .yAxisLabel("Hits per day")
            .xAxisLabel("Q1")
            .compose([compose1,compose2])
            .xAxis().ticks(0);


/*******************
 Render All in HTML
 *******************/


dc.renderAll();