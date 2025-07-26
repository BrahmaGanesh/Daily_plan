function renderWeeklyChart(plan){
  const weeks={};
  plan.forEach(e=>{
    const w=new Date(e.date).getWeek();
    weeks[w]=weeks[w]||{done:0,total:0};
    weeks[w].total++;
    if(e.completed) weeks[w].done++;
  });
  const labels=Object.keys(weeks);
  const data=labels.map(l=>Math.round(weeks[l].done/weeks[l].total*100));
  const ctx=document.getElementById("weeklyChart").getContext("2d");
  if(window._chart) window._chart.destroy();
  window._chart=new Chart(ctx,{
    type:"bar",
    data:{labels,datasets:[{label:"% done",data}]}
  });
}
