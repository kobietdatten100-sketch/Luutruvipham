const {
    Client,
    GatewayIntentBits,
    SlashCommandBuilder,
    REST,
    Routes,
    EmbedBuilder
} = require("discord.js");

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

client.once("ready", async () => {

    console.log(`✅ ${client.user.tag} đã online`);

    const commands = [
        new SlashCommandBuilder()
            .setName("thongbao")
            .setDescription("Gửi thông báo")
            .addStringOption(option =>
                option
                    .setName("noidung")
                    .setDescription("Nội dung thông báo")
                    .setRequired(true)
            )
            .toJSON()
    ];

    try {

        const rest = new REST({ version: "10" })
            .setToken(process.env.TOKEN);

        await rest.put(
            Routes.applicationCommands(client.user.id),
            { body: commands }
        );

        console.log("✅ Đã đăng ký Slash Commands");

    } catch (err) {
        console.error(err);
    }
});

client.on("interactionCreate", async interaction => {

    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "thongbao") {

        const noidung =
            interaction.options.getString("noidung");

        const embed = new EmbedBuilder()
            .setColor("#5865F2")
            .setTitle("📢 THÔNG BÁO CHÍNH THỨC")
            .setDescription(`>>> ${noidung}`)
            .addFields(
                {
                    name: "🕒 Thời gian",
                    value: `<t:${Math.floor(Date.now() / 1000)}:F>`
                },
                {
                    name: "📌 Trạng thái",
                    value: "Đang có hiệu lực"
                }
            )
            .setFooter({
                text: interaction.guild.name
            })
            .setTimestamp();

        await interaction.reply({
            content: "✅ Đã gửi thông báo",
            ephemeral: true
        });

        await interaction.channel.send({
            embeds: [embed]
        });
    }
});

client.login(process.env.TOKEN);
