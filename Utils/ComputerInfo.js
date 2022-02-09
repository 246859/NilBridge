const os = require('os');
const osutils = require('os-utils');
var cpuStat = require('cpu-stat');
const { delStamp } = require('oicq/lib/internal');



setInterval(() => {
    cpuStat.usagePercent(function(err, percent, seconds) {
        if (err) {
             return;
       }
       NIL.TOOL.COMPUTER.RAM_FREE = dealMem(os.freemem());
       NIL.TOOL.COMPUTER.CPU_PERCENT = parseFloat(percent).toFixed(2);
       NIL.TOOL.COMPUTER.RAM_USED = dealMem(os.totalmem()-os.freemem());
       NIL.TOOL.COMPUTER.RAM_PERCENT = (100*(osutils.totalmem()-osutils.freemem())/osutils.totalmem()).toFixed(2);
   });
}, 3000);



var dealMem = (mem)=>{
    var G = 0,
        M = 0,
        KB = 0;
    (mem>(1<<30))&&(G=(mem/(1<<30)).toFixed(2));
    (mem>(1<<20))&&(mem<(1<<30))&&(M=(mem/(1<<20)).toFixed(2));
    (mem>(1<<10))&&(mem>(1<<20))&&(KB=(mem/(1<<10)).toFixed(2));
    return G>0?G+'G':M>0?M+'M':KB>0?KB+'KB':mem+'B';
};
 
//内存
const totalMem = os.totalmem();


NIL.TOOL.COMPUTER.RAM_TOTAL = dealMem(totalMem);