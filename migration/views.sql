create view group_by_65 as SELECT q65 as answer, count(q65) as count from data where q65 <> '' group by q65;
create view group_by_70 as SELECT q70 as answer, count(q70) as count from data where q70 <> '' group by q70;
create view group_by_71 as SELECT q71 as answer, count(q71) as count from data where q71 <> '' group by q71;
create view group_by_35 as SELECT q35 as answer, count(q35) as count from data where q35 <> '' group by q35;
create view group_by_141 as SELECT q141 as answer, count(q141) as count from data where q141 <> '' group by q141;
create view group_by_157 as SELECT q157 as answer, count(q157) as count from data where q157 <> '' group by q157;
create view group_by_14 as SELECT q14 as answer, count(q14) as count from data where q14 <> '' group by q14;
create view group_by_7 as SELECT q7 as answer, count(q7) as count from data where q7 <> '' and q7::int < 51 group by q7 UNION SELECT '50+' constantvalue, count(1) as count from data where q7 <> '' and q7::int >=50;
CREATE VIEW group_by_15 AS SELECT jsonb_array_elements(data.q15) AS answer, COUNT(1) AS count FROM data GROUP BY answer;
CREATE VIEW group_by_9 AS SELECT jsonb_array_elements(data.q9) AS answer, COUNT(1) AS count FROM data GROUP BY answer;
CREATE VIEW group_by_32 AS SELECT jsonb_array_elements(data.q32) AS answer, COUNT(1) AS count FROM data GROUP BY answer;
CREATE VIEW group_by_30 AS SELECT jsonb_array_elements(data.q30) AS answer, COUNT(1) AS count FROM data GROUP BY answer;
CREATE VIEW group_by_33 AS SELECT jsonb_array_elements(data.q33) AS answer, COUNT(1) AS count FROM data GROUP BY answer;
CREATE VIEW group_by_36 AS SELECT jsonb_array_elements(data.q36) AS answer, COUNT(1) AS count FROM data GROUP BY answer;
CREATE VIEW group_by_37 AS SELECT jsonb_array_elements(data.q37) AS answer, COUNT(1) AS count FROM data GROUP BY answer;
CREATE VIEW group_by_51 AS SELECT jsonb_array_elements(data.q51) AS answer, COUNT(1) AS count FROM data GROUP BY answer;
CREATE VIEW group_by_133 AS SELECT jsonb_array_elements(data.q133) AS answer, COUNT(1) AS count FROM data GROUP BY answer;
CREATE VIEW group_by_136 AS SELECT jsonb_array_elements(data.q136) AS answer, COUNT(1) AS count FROM data GROUP BY answer;
CREATE VIEW group_by_139 AS SELECT jsonb_array_elements(data.q139) AS answer, COUNT(1) AS count FROM data GROUP BY answer;
CREATE VIEW group_by_142 AS SELECT jsonb_array_elements(data.q142) AS answer, COUNT(1) AS count FROM data GROUP BY answer;
CREATE VIEW group_by_143 AS SELECT jsonb_array_elements(data.q143) AS answer, COUNT(1) AS count FROM data GROUP BY answer;
CREATE VIEW group_by_144 AS SELECT jsonb_array_elements(data.q144) AS answer, COUNT(1) AS count FROM data GROUP BY answer;
CREATE VIEW group_by_146 AS SELECT jsonb_array_elements(data.q146) AS answer, COUNT(1) AS count FROM data GROUP BY answer;
CREATE VIEW group_by_149 AS SELECT jsonb_array_elements(data.q149) AS answer, COUNT(1) AS count FROM data GROUP BY answer;
CREATE VIEW group_by_152 AS SELECT jsonb_array_elements(data.q152) AS answer, COUNT(1) AS count FROM data GROUP BY answer;
CREATE VIEW group_by_155 AS SELECT jsonb_array_elements(data.q155) AS answer, COUNT(1) AS count FROM data GROUP BY answer;
CREATE VIEW group_by_158 AS SELECT jsonb_array_elements(data.q158) AS answer, COUNT(1) AS count FROM data GROUP BY answer;
CREATE VIEW group_by_159 AS SELECT jsonb_array_elements(data.q159) AS answer, COUNT(1) AS count FROM data GROUP BY answer;
CREATE VIEW group_by_160 AS SELECT jsonb_array_elements(data.q160) AS answer, COUNT(1) AS count FROM data GROUP BY answer;
CREATE VIEW group_by_162 AS SELECT jsonb_array_elements(data.q162) AS answer, COUNT(1) AS count FROM data GROUP BY answer;
CREATE VIEW group_by_130 AS SELECT jsonb_array_elements(data.q130) AS answer, COUNT(1) AS count FROM data GROUP BY answer;
CREATE VIEW group_by_53 AS SELECT jsonb_array_elements(data.q53) AS answer, COUNT(1) AS count FROM data GROUP BY answer;
CREATE VIEW group_by_74 AS SELECT jsonb_array_elements(data.q74) AS answer, COUNT(1) AS count FROM data GROUP BY answer;

CREATE VIEW group_by_30_133_149 AS SELECT jsonb_array_elements(comb.q) AS answer, COUNT(1) AS count FROM (SELECT data.q30 as q from data UNION ALL   SELECT data.q133 as q from data ) as comb GROUP BY answer;
CREATE VIEW group_by_33_139_155 AS SELECT jsonb_array_elements(comb.q) AS answer, COUNT(1) AS count FROM (SELECT data.q33 as q from data UNION ALL   SELECT data.q139 as q from data ) as comb GROUP BY answer;
CREATE VIEW group_by_37_143_159 AS SELECT jsonb_array_elements(comb.q) AS answer, COUNT(1) AS count FROM (SELECT data.q37 as q from data UNION ALL   SELECT data.q143 as q from data ) as comb GROUP BY answer;
CREATE VIEW group_by_51_144_160 AS SELECT jsonb_array_elements(comb.q) AS answer, COUNT(1) AS count FROM (SELECT data.q51 as q from data UNION ALL   SELECT data.q144 as q from data ) as comb GROUP BY answer;
CREATE VIEW group_by_36_142_158 AS SELECT jsonb_array_elements(comb.q) AS answer, COUNT(1) AS count FROM (SELECT data.q36 as q from data UNION ALL   SELECT data.q142 as q from data ) as comb GROUP BY answer;

CREATE VIEW group_by_35_141_157 AS SELECT comb.q as answer, count(q) from ((SELECT data.q35 as q from data where data.q35 <> '') UNION ALL  (SELECT data.q141 as q from data where data.q141 <> '' ) UNION all  (SELECT data.q157 as q from data where data.q157 <> '' )) as comb group by q;

CREATE FUNCTION floatToIntIfNumber() RETURNS trigger AS $that$
    BEGIN
        IF NEW.q7 <> '' and NEW.q7 <> '50+' and NEW.q7 is not null THEN
          NEW.q7 := floor(NEW.q7::numeric)::text;
	    END IF;
        RETURN NEW;
    END;
$that$ LANGUAGE plpgsql;

CREATE TRIGGER q7FloatToIntTrigger BEFORE INSERT ON data  FOR EACH ROW EXECUTE FUNCTION floatToIntIfNumber();
