INSERT INTO `energydss_db`.`user` (`email`, `password`, `role`, `organisation`) VALUES ('manager@nhs.co.uk', '$2a$12$btJqTtu4KlORh1RzUJj7OeHPhE7IvZqJ1HyNO0sG.SQADNZAtZiaG', 'manager', 'NHS');
INSERT INTO `energydss_db`.`organisation` (`orgName`) VALUES ('Cardiff University');
INSERT INTO `energydss_db`.`organisation` (`orgName`) VALUES ('NHS');
INSERT INTO `energydss_db`.`targets` (`id`, `organisation`, `name`, `value`, `timeframe`) VALUES ('1', 'NHS', 'cost', '12000', 'weekly');
INSERT INTO `energydss_db`.`targets` (`id`, `organisation`, `name`, `value`, `timeframe`) VALUES ('2', 'NHS', 'cost', '60000', 'monthly');
INSERT INTO `energydss_db`.`targets` (`id`, `organisation`, `name`, `value`, `timeframe`) VALUES ('3', 'NHS', 'energy', '1700000', 'weekly');
INSERT INTO `energydss_db`.`targets` (`id`, `organisation`, `name`, `value`, `timeframe`) VALUES ('5', 'NHS', 'carbon', '15', 'weekly');
INSERT INTO `energydss_db`.`targets` (`id`, `organisation`, `name`, `value`, `timeframe`) VALUES ('6', 'NHS', 'carbon', '70', 'monthly');
INSERT INTO `energydss_db`.`targets` (`id`, `organisation`, `name`, `value`, `timeframe`) VALUES ('4', 'NHS', 'energy', '9000000', 'monthly');
INSERT INTO `energydss_db`.`targets` (`id`, `organisation`, `name`, `value`, `timeframe`) VALUES ('7', 'Cardiff University', 'cost', '12000', 'weekly');
INSERT INTO `energydss_db`.`targets` (`id`, `organisation`, `name`, `value`, `timeframe`) VALUES ('8', 'Cardiff University', 'cost', '50000', 'monthly');
INSERT INTO `energydss_db`.`targets` (`id`, `organisation`, `name`, `value`, `timeframe`) VALUES ('9', 'Cardiff University', 'energy', '950000', 'weekly');
INSERT INTO `energydss_db`.`targets` (`id`, `organisation`, `name`, `value`, `timeframe`) VALUES ('10', 'Cardiff University', 'carbon', '15', 'weekly');
INSERT INTO `energydss_db`.`targets` (`id`, `organisation`, `name`, `value`, `timeframe`) VALUES ('11', 'Cardiff University', 'carbon', '55', 'monthly');
INSERT INTO `energydss_db`.`targets` (`id`, `organisation`, `name`, `value`, `timeframe`) VALUES ('12', 'Cardiff University', 'energy', '4500000', 'monthly');
INSERT INTO `energydss_db`.`optimisations` (`organisation`, `priority`, `title`, `body`, `archived`) VALUES ('Cardiff University', '3', 'Reduce number of computers', 'Reduces electricity consumption and cost', '0');
INSERT INTO `energydss_db`.`optimisations` (`organisation`, `priority`, `title`, `body`, `archived`) VALUES ('Cardiff University', '2', 'Reduce heating', 'Reduces electricity consumption and cost in the summer', '0');
INSERT INTO `energydss_db`.`optimisations` (`organisation`, `priority`, `title`, `body`, `archived`) VALUES ('Cardiff University', '1', 'Install solar panels', 'Generate own electricity', '0');
INSERT INTO `energydss_db`.`optimisations` (`organisation`, `priority`, `title`, `body`, `archived`) VALUES ('Cardiff University', '1', 'Turn off lights', 'turn off lights to save cost', '0');


