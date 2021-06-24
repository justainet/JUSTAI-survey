var q9  = String("${q://QID9/ChoiceGroup/SelectedChoices}").split(",").map(it=>it.trim()).filter(it=>it!=="")
var q30 = String("${q://QID30/ChoiceGroup/SelectedChoices}").split(",").map(it=>it.trim()).filter(it=>it!=="")
var q33 = String("${q://QID33/ChoiceGroup/SelectedChoices}").split(",").map(it=>it.trim()).filter(it=>it!=="") 
var q36 = String("${q://QID36/ChoiceGroup/SelectedChoices}").split(",").map(it=>it.trim()).filter(it=>it!=="") 
var q37 = String("${q://QID37/ChoiceGroup/SelectedChoices}").split(",").map(it=>it.trim()).filter(it=>it!=="") 
var q51 = String("${q://QID51/ChoiceGroup/SelectedChoices}").split(",").map(it=>it.trim()).filter(it=>it!=="") 
var q133 = String("${q://QID133/ChoiceGroup/SelectedChoices}").split(",").map(it=>it.trim()).filter(it=>it!=="") 
var q139 = String("${q://QID139/ChoiceGroup/SelectedChoices}").split(",").map(it=>it.trim()).filter(it=>it!=="")
var q142 = String("${q://QID142/ChoiceGroup/SelectedChoices}").split(",").map(it=>it.trim()).filter(it=>it!=="") 
var q143 = String("${q://QID143/ChoiceGroup/SelectedChoices}").split(",").map(it=>it.trim()).filter(it=>it!=="") 
var q144 = String("${q://QID144/ChoiceGroup/SelectedChoices}").split(",").map(it=>it.trim()).filter(it=>it!=="") 


const a = {
    "created": "${date://CurrentDate/DS}",
    "email": "${q://QID2/ChoiceTextEntryValue}",
    "response_id": "${rm://Field/ResponseID}",
    "q1": "${q://QID1/ChoiceTextEntryValue}",   
    "q2": "${q://QID2/ChoiceTextEntryValue}",   
    "q7": "${q://QID7/ChoiceTextEntryValue}",   
    "q70": "${q://QID70/ChoiceGroup/SelectedChoices}",   
    "q71": "${q://QID71/ChoiceGroup/SelectedChoices}",   
    "q65": "${q://QID65/ChoiceGroup/SelectedChoices}",   
    "q14": "${q://QID14/ChoiceGroup/SelectedChoices}",   
    "q9": q9,
    "q30": q30,
    "q33": q33,
    "q35": "${q://QID35/ChoiceGroup/SelectedChoices}",   
    "q36": q36,
    "q37": q37,
    "q51": q51,
    "q133": q133,
    "q139": q139,
    "q141": "${q://QID141/ChoiceGroup/SelectedChoices}",
    "q142": q142,
    "q143": q143,
    "q144": q144
}
