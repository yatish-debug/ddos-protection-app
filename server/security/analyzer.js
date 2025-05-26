const { checkIpReputation } = require('./ipReputation');
const { checkGeoAnomaly } = require('./geoCheck');
const { checkBehaviorPattern } = require('./behaviorAnalysis');

module.exports.analyzeRequest = (req) => {
    const result = {
        isMalicious: false,
        reasons: []
    };
    
    const ipRep = checkIpReputation(req.ip);
    if (ipRep.score > 7) {
        result.isMalicious = true;
        result.reasons.push(`Bad IP reputation (score: ${ipRep.score})`);
    }
    
    const geoResult = checkGeoAnomaly(req);
    if (geoResult.isAnomaly) {
        result.isMalicious = true;
        result.reasons.push(`Geographic anomaly: ${geoResult.reason}`);
    }
    
    const behaviorResult = checkBehaviorPattern(req);
    if (behaviorResult.isSuspicious) {
        result.isMalicious = true;
        result.reasons.push(`Suspicious behavior: ${behaviorResult.reason}`);
    }
    
    if (req.rateLimit.remaining < 5 && result.reasons.length > 1) {
        result.isMalicious = true;
        result.reasons.push('High request rate');
    }
    
    return result;
};
