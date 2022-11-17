INSERT INTO `energydss_db`.`user` (`id`, `email`, `password`, `role`, `organisation`) VALUES ('1', 'account@cardiff.ac.uk', '$2a$12$btJqTtu4KlORh1RzUJj7OeHPhE7IvZqJ1HyNO0sG.SQADNZAtZiaG', 'manager', '1');
INSERT INTO `energydss_db`.`user` (`id`, `email`, `password`, `role`, `organisation`) VALUES ('2', 'account@nhs.co.uk', '$2a$12$btJqTtu4KlORh1RzUJj7OeHPhE7IvZqJ1HyNO0sG.SQADNZAtZiaG', 'manager', '2');
INSERT INTO `energydss_db`.`organisation` (`id`, `name`) VALUES ('1', 'Cardiff University');
INSERT INTO `energydss_db`.`organisation` (`id`, `name`) VALUES ('2', 'NHS');
INSERT INTO `energydss_db`.`targets` (`id`, `organisation`, `name`, `value`, `timeframe`) VALUES ('1', '2', 'cost', '45', 'weekly');
INSERT INTO `energydss_db`.`targets` (`id`, `organisation`, `name`, `value`, `timeframe`) VALUES ('2', '2', 'cost', '79', 'monthly');
INSERT INTO `energydss_db`.`targets` (`id`, `organisation`, `name`, `value`, `timeframe`) VALUES ('3', '2', 'energy', '3343', 'weekly');
INSERT INTO `energydss_db`.`targets` (`id`, `organisation`, `name`, `value`, `timeframe`) VALUES ('5', '2', 'carbon', '0', 'weekly');
INSERT INTO `energydss_db`.`targets` (`id`, `organisation`, `name`, `value`, `timeframe`) VALUES ('6', '2', 'carbon', '0', 'monthly');
INSERT INTO `energydss_db`.`targets` (`id`, `organisation`, `name`, `value`, `timeframe`) VALUES ('4', '2', 'energy', '9867', 'monthly');
INSERT INTO `energydss_db`.`optimisations` (`id`, `organisation`, `priority`, `title`, `body`, `achived`) VALUES ('1', '1', 'low', 'Turn off lights', 'turn off lights to save cost', '0');
INSERT INTO `energydss_db`.`targets` (`id`, `organisation`, `name`, `value`, `timeframe`) VALUES ('7', '1', 'cost', '10000', 'weekly');
INSERT INTO `energydss_db`.`targets` (`id`, `organisation`, `name`, `value`, `timeframe`) VALUES ('8', '1', 'cost', '40000', 'monthly');
INSERT INTO `energydss_db`.`targets` (`id`, `organisation`, `name`, `value`, `timeframe`) VALUES ('9', '1', 'energy', '60000', 'weekly');
INSERT INTO `energydss_db`.`targets` (`id`, `organisation`, `name`, `value`, `timeframe`) VALUES ('10', '1', 'carbon', '20', 'weekly');
INSERT INTO `energydss_db`.`targets` (`id`, `organisation`, `name`, `value`, `timeframe`) VALUES ('11', '1', 'carbon', '30', 'monthly');
INSERT INTO `energydss_db`.`targets` (`id`, `organisation`, `name`, `value`, `timeframe`) VALUES ('12', '1', 'energy', '150000', 'monthly');


