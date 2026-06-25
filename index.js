const {
    Client,
    GatewayIntentBits,
    EmbedBuilder,
    PermissionsBitField
} = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const PREFIX = "!";

client.once("ready", () => {
    console.log(`✅ ${client.user.tag} đã online`);
});

client.on("messageCreate", async (message) => {

    if (message.author.bot) return;
    if (!message.guild) return;

    if (!message.content.startsWith(`${PREFIX}tb`)) return;

    if (
        !message.member.permissions.has(
            PermissionsBitField.Flags.ManageMessages
        )
    ) {
        return message.reply("❌ Bạn không có quyền sử dụng lệnh này.");
    }

    const content = message.content.slice(3).trim();

    if (!content) {
        return message.reply(
            "❌ Vui lòng nhập nội dung.\nVí dụ: `!tb Máy chủ bảo trì lúc 20h`"
        );
    }

    const embed = new EmbedBuilder()
        .setTitle("📢 THÔNG BÁO")
        .setDescription(content)
        .setColor("#0099ff")
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter({
            text: "Hệ thống thông báo"
        })
        .setTimestamp();

    try {
        await message.channel.send({
            embeds: [embed]
        });

        await message.delete().catch(() => {});
    } catch (err) {
        console.error(err);
    }
});

client.login(process.env.TOKEN);
