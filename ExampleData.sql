INSERT INTO `energydss_db`.`user` (`id`, `email`, `password`, `role`, `organisation`) VALUES ('3', 'account@cardiff.ac.uk', '$2a$12$btJqTtu4KlORh1RzUJj7OeHPhE7IvZqJ1HyNO0sG.SQADNZAtZiaG', 'manager', 'Cardiff University');
INSERT INTO `energydss_db`.`user` (`id`, `email`, `password`, `role`, `organisation`) VALUES ('4', 'account@nhs.co.uk', '$2a$12$btJqTtu4KlORh1RzUJj7OeHPhE7IvZqJ1HyNO0sG.SQADNZAtZiaG', 'manager', 'NHS');
INSERT INTO `energydss_db`.`organisation` (`id`, `orgName`) VALUES ('1', 'Cardiff University');
INSERT INTO `energydss_db`.`organisation` (`id`, `orgName`) VALUES ('2', 'NHS');
INSERT INTO `energydss_db`.`targets` (`id`, `organisation`, `name`, `value`, `timeframe`) VALUES ('1', 'NHS', 'cost', '45', 'weekly');
INSERT INTO `energydss_db`.`targets` (`id`, `organisation`, `name`, `value`, `timeframe`) VALUES ('2', 'NHS', 'cost', '79', 'monthly');
INSERT INTO `energydss_db`.`targets` (`id`, `organisation`, `name`, `value`, `timeframe`) VALUES ('3', 'NHS', 'energy', '3343', 'weekly');
INSERT INTO `energydss_db`.`targets` (`id`, `organisation`, `name`, `value`, `timeframe`) VALUES ('5', 'NHS', 'carbon', '0', 'weekly');
INSERT INTO `energydss_db`.`targets` (`id`, `organisation`, `name`, `value`, `timeframe`) VALUES ('6', 'NHS', 'carbon', '0', 'monthly');
INSERT INTO `energydss_db`.`targets` (`id`, `organisation`, `name`, `value`, `timeframe`) VALUES ('4', 'NHS', 'energy', '9867', 'monthly');
INSERT INTO `energydss_db`.`optimisations` (`id`, `organisation`, `priority`, `title`, `body`, `archived`) VALUES ('1', 'Cardiff University', 'low', 'Turn off lights', 'turn off lights to save cost', '0');
INSERT INTO `energydss_db`.`targets` (`id`, `organisation`, `name`, `value`, `timeframe`) VALUES ('7', 'Cardiff University', 'cost', '10000', 'weekly');
INSERT INTO `energydss_db`.`targets` (`id`, `organisation`, `name`, `value`, `timeframe`) VALUES ('8', 'Cardiff University', 'cost', '40000', 'monthly');
INSERT INTO `energydss_db`.`targets` (`id`, `organisation`, `name`, `value`, `timeframe`) VALUES ('9', 'Cardiff University', 'energy', '60000', 'weekly');
INSERT INTO `energydss_db`.`targets` (`id`, `organisation`, `name`, `value`, `timeframe`) VALUES ('10', 'Cardiff University', 'carbon', '20', 'weekly');
INSERT INTO `energydss_db`.`targets` (`id`, `organisation`, `name`, `value`, `timeframe`) VALUES ('11', 'Cardiff University', 'carbon', '30', 'monthly');
INSERT INTO `energydss_db`.`targets` (`id`, `organisation`, `name`, `value`, `timeframe`) VALUES ('12', 'Cardiff University', 'energy', '150000', 'monthly');


